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
import { requirePropFactory } from '@material-ui/core';

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
    const [quesNewVal, setQuesNewVal] = useState("");

    useEffect(() => {
        setWrite(isAdmin)
        const fun = async () => {
            const res = await axios.get(process.env.REACT_APP_PROXY_URL + "questions", config)
            setQuestions([...res.data, emptyQuestionContent])
        }
        fun()
    }, [])

    const selectMode = isWrite => () => {
        setWrite(isWrite)
    }

    const changeAnswerType = id => event => {
        const ques = _.cloneDeep(questions);
        console.log(id)
        const res = _.find(ques, { _id: id });
        if (!res) return;
        res['answerType'] = event.target.value;
        setQuestions(ques)
    }

    const changeAnserValue = (id, index) => event => {
        const ques = _.cloneDeep(questions);
        const res = _.find(ques, { _id: id });
        if (!res) return;
        res['answerVal'][index] = event.target.value
        setQuestions(ques)
    }

    const createAnswerVal = (id) => () => {
        if (!quesNewVal) return;
        const ques = _.cloneDeep(questions);
        const res = _.find(ques, { _id: id });
        if (!res) return;
        res['answerVal'][res['answerVal'].length] = quesNewVal
        setQuestions(ques)
        setQuesNewVal("")
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

    const onSave = async() => {
        if(!questions.length) return;
        let ques = _.cloneDeep(questions);
        let req = ques[questions.length-1]
        if(!req.title && !req.question) return;
        console.log(req)
        const res = await axios.post(process.env.REACT_APP_PROXY_URL + "questions", {
            title: req.title,
            description: req.description,
            question: req.question,
            answerType: req.answerType,
            answerVal: req.answerVal
        })
        if(res.data) {
            req._id = res.data._id;
            ques.push(emptyQuestionContent)
            setQuestions(ques)
        }
    }

    const onUpdate = (id) => async() => {
        let ques = _.cloneDeep(questions);
        let req = _.find(ques, { _id: id });
        if(!req.title && !req.question) return;
        const res = await axios.put(process.env.REACT_APP_PROXY_URL + "questions/" + id, {
            title: req.title,
            description: req.description,
            question: req.question,
            answerType: req.answerType,
            answerVal: req.answerVal
        })
        if(res.data) {
            setQuestions(ques)
        }
    }

    const onRemove = (id) => async() => {
        let ques = _.cloneDeep(questions);
        let req = _.findIndex(ques, { _id: id });
        if(req === -1) return;
        if(!ques[req].title && !ques[req].question) return;
        const res = await axios.delete(process.env.REACT_APP_PROXY_URL + "questions/" + id)
        if(res.data) {
            ques.splice(req, 1);
            setQuestions(ques)
        }
    }

    const renderContent = () => {
        if (isAdmin) {
            return <>
                <ButtonGroup color="primary" aria-label="outlined secondary button group">
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
            return
        }
    }

    const renderViewQuestions = () => {
        return (
            <div>
                {_.map(questions, (question, index) => {
                    return <React.Fragment key={index}>
                        <div className="ques-view-title" >
                            <div className="ques-view-title-mark" />
                            {index + 1}. {question.title}
                        </div>
                        <div className="ques-view-description">
                            {question.description}
                        </div>
                        <div className="ques-view-ques">
                            {question.question}
                        </div>
                        {question.answerType === OPTIONAL && <RadioGroup aria-label="quiz" name="quiz" >
                            {
                                _.map(question.answerVal, (each, index) => {
                                    return <FormControlLabel value={each} control={<Radio />} label={each} key={index} />
                                })
                            }
                        </RadioGroup>}
                        {question.answerType === MULTISELECT && <FormGroup>
                            {_.map(question.answerVal, (each, index) => {
                                return <FormControlLabel
                                    control={<Checkbox name={each} />}
                                    label={each}
                                    key={index}
                                />
                            })}
                        </FormGroup>}
                    </React.Fragment>
                })}
            </div>
        )
    }

    const renderEachQuestion = (question) => {
        return (
            <div key={question._id} className="ques-wrapper">
                <TextField
                    id="standard-full-width"
                    label="title"
                    style={{ margin: 8 }}
                    placeholder="Title"
                    margin="normal"
                    value={question.title}
                    onChange={chnageTitle(question._id)}
                />
                <TextField
                    id="standard-multiline-static"
                    label="Description"
                    multiline
                    style={{ margin: 8 }}
                    value={question.description}
                    onChange={chnageDescription(question._id)}
                />
                <TextField
                    label="Question"
                    style={{ margin: 8 }}
                    placeholder="What is your favourite sports?"
                    margin="normal"
                    value={question.question}
                    onChange={chnageQuestion(question._id)}
                />
                <div style={{ margin: 8, display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Select"
                        value={question.answerType}
                        onChange={changeAnswerType(question.id)}
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
                                            value={each}
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
                                label="values"onUpdate
                                value={quesNewVal}
                                onChange={(e) => { setQuesNewVal(e.target.value) }}
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
                        <Button variant='contained' color="secondary" onClick={onRemove(question._id)}>Remove</Button>
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
        </div>
    )
}

export default Questions
