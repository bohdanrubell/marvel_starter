import React, {useState} from "react";
import useMarvelService from "../../services/MarvelService";
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from "yup";
import './charFormSearch.scss'

import ErrorMessage from '../errorMessage/ErrorMessage';
import {Link} from "react-router-dom";
import Spinner from "../spinner/Spinner";

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return null;
        case 'loading':
            return null;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return !data ? <div className="char__search-error">
                The character was not found. Check the name and try again
            </div> : <div className="char__search-critical-error"><ErrorMessage/></div>;
        default:
            throw new Error(`Unexpected process state`);
    }
}

const CharFormSearch = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError, process, setProcess} = useMarvelService();

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }
    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required("This field is required!"),
                })}
                onSubmit={({charName}) => {
                    updateChar(charName);
                }}
            >
                <Form>
                <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                <div className="char__search-wrapper">
                    <Field
                        id="charName"
                        name='charName'
                        type='text'
                        placeholder="Enter name"/>
                    <button
                        type='submit'
                        className="button button__main"
                        disabled={process === 'loading'}>
                        <div className="inner">find</div>
                    </button>
                </div>
                    <FormikErrorMessage className="char__search-error" component="div" name="charName" />
                </Form>
            </Formik>
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    return (
        <>
            <div className="char__search-wrapper">
                <div className="char__search-success">There is! Visit {data.name} page?</div>
                <Link to={`/char/${data.id}`} className="button button__secondary">
                    <div className="inner">To page</div>
                </Link>
            </div>
        </>
    )
}


export default CharFormSearch;