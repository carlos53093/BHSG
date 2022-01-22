import './Styles.css'
import { useAppSelector } from '../app/hooks'
import { IsAdmin } from '../actions/UserInfo'
import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import _ from "lodash"
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { useWallet } from '@solana/wallet-adapter-react'
import { useHistory } from 'react-router-dom';
import Modal from './Modal';
import { Snackbar } from '@material-ui/core';
import { Alert, AlertTitle, Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        width: '100%',
    },
}));

const OPTIONAL = 0
const MULTISELECT = 1

const MODAL_STATE_REMOOVE = 0
const MODAL_STATE_SUBMIT = 1

const emptyQuestionContent = {
    _id: undefined,
    title: "",
    description: "",
    question: "",
    answerType: OPTIONAL,
    answerVal: []
}

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

const Questions = (props) => {
    const isAdmin = useAppSelector(IsAdmin)
    const classes = useStyles();
    const [isWrite, setWrite] = useState(false)
    const [questions, setQuestions] = useState([]);
    const [quesNewVal, setQuesNewVal] = useState({});
    const { publicKey } = useWallet()
    const history = useHistory()
    const [answers, setAnswers] = useState([]);
    const [modalState, setModalState] = useState({})
    const [resultState, setResultState] = useState({})
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        setWrite(isAdmin)
        console.log(publicKey)
        if (!publicKey) {
            history.push("/");
            return;
        }
        const fun = async () => {
            try{
                const res = await axios.get(process.env.REACT_APP_PROXY_URL + "questions", config)

                const intialQuestVal = {}
                _.each(res.data, i => {
                    const id = i._id;
                    _.set(intialQuestVal, id, "");
                })
                if (isAdmin) {
                    _.set(intialQuestVal, undefined, "");
                    setQuestions([...res.data, emptyQuestionContent])
                }
                else {
                    setQuestions([...res.data])
                }
                setQuesNewVal(intialQuestVal)

                const ans = await axios.get(process.env.REACT_APP_PROXY_URL + "answer/" + (publicKey.toBase58()), config)
                console.log("answers", ans.data)
                if(!ans.data.answers) {
                    setAnswers([]);
                } else {
                    setAnswers(ans.data.answers.answer);
                }
                setVotes(ans.data.voteList);
                
            } catch(e){
                console.log(e);
                setResultState({state: "error", message: "fail in loading! Check the net connection."})
            }
            
        }
        fun()
    }, [])

    useEffect(()=>{
        if(!_.isEmpty(resultState)) {
            setSnackbarOpen(true)
            setTimeout(()=>{
                setResultState({});
            }, 6000)
        }
    },[resultState])

    const selectMode = isWrite => () => {
        setWrite(isWrite)
    }

    const changeAnswerType = id => event => {
        const ques = _.cloneDeep(questions);
        const res = _.findIndex(ques, { _id: id });
        if (res === -1) return;
        _.set(ques, [res, 'answerType'], event.target.value);
        setQuestions(ques)
    }

    const changeAnserValue = (id, index) => event => {
        const ques = _.cloneDeep(questions);
        const res = _.find(ques, { _id: id });
        if (!res) return;
        _.set(res, ['answerVal', index, 'title'], event.target.value)
        setQuestions(ques)
    }

    const createAnswerVal = (id) => () => {
        if (!quesNewVal) return;
        const ques = _.cloneDeep(questions);
        const res = _.find(ques, { _id: id });
        if (!res) return;
        _.set(res, ["answerVal", res['answerVal'].length, "title"], _.get(quesNewVal, id));
        setQuestions(ques)
        let questVal = { ...quesNewVal }
        _.set(questVal, id, "")
        setQuesNewVal(questVal)
    }

    const chnageTitle = (id) => event => {
        const ques = _.cloneDeep(questions);
        const res = _.find(ques, { _id: id });
        if (!res) return;
        res['title'] = event.target.value
        setQuestions(ques)
    }

    const chnageQuestion = (id) => event => {
        const ques = _.cloneDeep(questions);
        const res = _.find(ques, { _id: id });
        if (!res) return;
        res['question'] = event.target.value
        setQuestions(ques)
    }

    const chnageDescription = (id) => event => {
        const ques = _.cloneDeep(questions);
        const res = _.find(ques, { _id: id });
        if (!res) return;
        res['description'] = event.target.value
        setQuestions(ques)
    }

    const removeQuesVal = (id, index) => () => {
        const ques = _.cloneDeep(questions);
        const res = _.find(ques, { _id: id });
        if (!res) return;
        res['answerVal'].splice(index, 1);
        setQuestions(ques)
    }

    const onSave = async () => {
        if (!questions.length) return;
        let ques = _.cloneDeep(questions);
        let req = ques[questions.length - 1]
        if (!req.title && !req.question) return;
        try {
            const res = await axios.post(process.env.REACT_APP_PROXY_URL + "questions", {
                title: req.title,
                description: req.description,
                question: req.question,
                answerType: req.answerType,
                answerVal: req.answerVal
            })
            if (res.data) {
                req._id = res.data._id;
                ques.push(emptyQuestionContent)
                setQuestions(ques)
            }
            setResultState({state: "success", message: "Success in saving!"})
        } catch (e) {
            setResultState({state: "error", message: "Fail in saving! Try again."})
        }
        
    }

    const onUpdate = (id) => async () => {
        let ques = _.cloneDeep(questions);
        let req = _.find(ques, { _id: id });
        if (!req.title && !req.question) return;
        try {
            const res = await axios.put(process.env.REACT_APP_PROXY_URL + "questions/" + id, {
                title: req.title,
                description: req.description,
                question: req.question,
                answerType: req.answerType,
                answerVal: req.answerVal
            })
            if (res.data) {
                setQuestions(ques)
            }
            setResultState({state: "success", message: "Updated successfully!"})
        } catch (e) {
            setResultState({state: "error", message: "Fail in updating! Try again."})
        }
    }

    const onRemove = (id) => async () => {
        let ques = _.cloneDeep(questions);
        let req = _.findIndex(ques, { _id: id });
        if (req === -1) return;
        if (!ques[req].title && !ques[req].question) return;
        try {
            const res = await axios.delete(process.env.REACT_APP_PROXY_URL + "questions/" + id)
            if (res.data) {
                ques.splice(req, 1);
                setQuestions(ques)
            }
            setResultState({state: "success", message: "Removed successfully!"})
        } catch(e) {
            setResultState({state: "error", message: "Fail in removing! Try again."})
        }
    }

    const onSubmit = async () => {
        if (!answers) {
            setResultState({state: "warning", message: "please answer the questions below!"})
            return;
        }
        console.log("correctAsw",answers);

        try {
            const res = await axios.post(process.env.REACT_APP_PROXY_URL + "answer", { walletAddr: publicKey.toBase58(), answer: answers});
            console.log(res);
            setVotes(res.data.voteList);
        } catch(e) {
            setResultState({state: "error", message: "Fail in removing! Try again."})
        }
    }

    const onChangeOptional = (id, aswid) => e => {
        const answerNew = [...answers];
        const res = _.find(answerNew, { questionId: id })
        console.log(answerNew)
        if (!res) {
            console.log("empty")
            answerNew.push({ questionId: id, values: [aswid] })
        } else {
            console.log("exist", res)
            res.values = [aswid]
        }
        setAnswers(answerNew)
        console.log(answerNew)
    }

    const onChangeCheckbox = (id, aswid) => e => {
        const answerNew = [...answers];
        const res = _.find(answerNew, { questionId: id })
        console.log(answerNew, aswid)
        if (!res) {
            console.log("empty")
            answerNew.push({ questionId: id, values: [aswid] })
        } else {
            console.log("exist", res, e.target.checked)
            if (e.target.checked) {
                res.values.push(aswid)
            } else {
                const index = _.indexOf(res.values, aswid)
                if (index === -1) return;
                res.values.splice(index, 1);
            }
        }
        setAnswers(answerNew)
        console.log(answerNew)
    }

    const modalConfirm = () => {
        if (modalState.state === MODAL_STATE_REMOOVE) {
            onRemove(modalState.id)()
        } else if (modalState.state === MODAL_STATE_SUBMIT) {
            onSubmit()
        }
        setModalState({})
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarOpen(false);
      };

    const renderContent = () => {
        if (isAdmin) {
            return <>
                <ButtonGroup color="primary" aria-label="outlined secondary button group" style={{ marginLeft: 20 }}>
                    <Button className={isWrite ? "ques-btn-white" : ""} onClick={selectMode(true)}>Write</Button>
                    <Button className={!isWrite ? "ques-btn-white" : ""} onClick={selectMode(false)}>Preview</Button>
                </ButtonGroup>
                {
                    isWrite ?
                        <div className="ques-write-container">
                            <div className='ques-each-container'>
                                {renderQuestions()}
                            </div>
                        </div>
                        :
                        <div className="ques-preview-container">
                            {renderViewQuestions()}
                        </div>
                }
            </>
        } else {
            return <div style={{ width: '100%' }}>
                {renderViewQuestions()}
                <Button variant="contained" color="primary" style={{ marginTop: 30 }} onClick={() => {
                    setModalState({ open: true, content: "Did you check all of them?", state: MODAL_STATE_SUBMIT })
                }}>Submit</Button>
            </div>
        }
    }

    const renderViewQuestions = () => {
        const getRadioVal = (id) => {
            const res = _.find(answers, { questionId: id })
            if (!res) return undefined;
             return _.get(res.values, 0, "");
        }
        const getCheckedVal = (id, val) => {
            const res = _.find(answers, { questionId: id })
            if (!res) return false;
            if (_.indexOf(res.values, val._id) === -1) {
                return false;
            }
            return true
        }
        return (
            <div>
                {_.map(questions, (question, index) => {
                    if (index === questions.length - 1 && !question._id && !question.question) return null;
                    return <React.Fragment key={index}>
                        <div className="ques-view-title" >
                            <div className="ques-view-title-mark" />
                            {index + 1}. {question.title}
                        </div>
                        <div className="ques-view-description">
                            {question.description}
                        </div>
                        <div className="ques-view-ques">
                            <h3>{question.question}</h3>
                        </div>
                        {question.answerType === OPTIONAL &&
                            <RadioGroup
                                aria-label="quiz"
                                name="quiz"
                                style={{ paddingLeft: 20 }}
                                value={getRadioVal(question._id) ?? ""}
                            >
                                {
                                    _.map(question.answerVal, (each, index) => {
                                        return <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <FormControlLabel onChange={onChangeOptional(question._id, each._id)} value={each._id} control={<Radio />} label={each.title} key={index} />
                                            <div style={{}}>Votes: {_.find(votes, {id: each._id})?.votes || 0}</div>
                                        </div>
                                    })
                                }
                            </RadioGroup>}
                        {question.answerType === MULTISELECT && <FormGroup style={{ paddingLeft: 20 }}>
                            {_.map(question.answerVal, (each, index) => {
                                return <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><FormControlLabel
                                    control={<Checkbox name={each._id} onChange={onChangeCheckbox(question._id, each._id)} checked={getCheckedVal(question._id, each) ?? false} />}
                                    label={each.title}
                                    key={index}
                                />
                                <div style={{}}>Votes: {_.find(votes, {id: each._id})?.votes || 0}</div>
                                </div>
                            })} 
                        </FormGroup>}
                    </React.Fragment>
                })}
            </div>
        )
    }

    const renderEachQuestion = (question) => {
        const id = question._id;
        return (
            <div key={question._id} className="ques-wrapper">
                <TextField
                    id="standard-full-width"
                    label="title"
                    style={{ margin: 8 }}
                    placeholder="Title"
                    margin="normal"
                    value={question.title ?? ""}
                    onChange={chnageTitle(question._id)}
                />
                <TextField
                    id="standard-multiline-static"
                    label="Description"
                    multiline
                    style={{ margin: 8 }}
                    value={question.description ?? ""}
                    onChange={chnageDescription(question._id)}
                />
                <TextField
                    label="Question"
                    style={{ margin: 8 }}
                    placeholder="What is your favourite sports?"
                    margin="normal"
                    value={question.question ?? ""}
                    onChange={chnageQuestion(question._id)}
                />
                <div style={{ margin: 8, display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Select"
                        value={question.answerType}
                        onChange={changeAnswerType(id)}
                        style={{ width: '30%' }}
                    >
                        <MenuItem value={OPTIONAL}>
                            Optional
                        </MenuItem>
                        <MenuItem value={MULTISELECT}>
                            MultiSelect
                        </MenuItem>
                    </TextField>
                    <div className="ques-values">
                        {
                            _.map(question.answerVal, (each, index) => {
                                return (
                                    <div className='ques-val' key={index}>
                                        <TextField
                                            label="values"
                                            value={each.title}
                                            onChange={changeAnserValue(question._id, index)}
                                            fullWidth
                                            style={{ marginRight: 10 }}
                                        />
                                        <Button color="secondary" style={{ marginRight: 10 }} onClick={removeQuesVal(question._id, index)}>Delete</Button>
                                    </div>
                                )
                            })
                        }
                        <div className='ques-val'>
                            <TextField
                                label="values"
                                value={_.get(quesNewVal, id, "")}
                                onChange={(e) => {
                                    const quesVal = { ...quesNewVal }
                                    _.set(quesVal, id, e.target.value)
                                    setQuesNewVal(quesVal)
                                }}
                                fullWidth
                                style={{ marginRight: 10 }}
                            />
                            <Button variant='contained' color="primary" onClick={createAnswerVal(question._id)}>Create</Button>
                        </div>
                    </div>
                </div>
                
                {!question._id ?
                    <div className="ques-save-container">
                        <Button variant='contained' color="primary" onClick={onSave}>Save</Button>
                    </div>
                    :
                    <div className="ques-save-container">
                        <Button variant='contained' color="primary" onClick={onUpdate(question._id)}>Update</Button>
                        <Button variant='contained' color="secondary" onClick={() => {
                            setModalState({
                                open: true,
                                content: "You are going to remove the question now.",
                                state: MODAL_STATE_REMOOVE,
                                id: question._id
                            })
                        }}>Remove</Button>
                    </div>
                }
            </div>
        )
    }

    const renderQuestions = () => {
        return _.map(questions, question => {

            return renderEachQuestion(question)
        })
    }
    return (
        <div className={" ques_container "} >
            <div className={classes.root} >
                {renderContent()}
            </div>
            <Modal
                open={modalState.open ?? false}
                content={modalState.content ?? ""}
                confirm={modalConfirm}
                onClose={()=>{setModalState({})}}
            />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={handleClose}
                message="I love snacks"
                key={'top' + 'center'}
            >
                <Alert severity={resultState.state} variant="filled">
                    <AlertTitle>{resultState.state}</AlertTitle>
                    {resultState.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Questions
