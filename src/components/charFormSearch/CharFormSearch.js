import {useState} from "react";
import useMarvelService from "../../services/MarvelService";
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from "yup";
import './charFormSearch.scss'

import ErrorMessage from '../errorMessage/ErrorMessage';
import {Link} from "react-router-dom";

const CharFormSearch = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    console.log(char);
    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const result = !char ? null : char.name.length > 0 || char === 'undefined' ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char.name} page?</div>
            <Link to={`/char/${char.id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>;


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
                        disabled={loading}>
                        <div className="inner">find</div>
                    </button>
                </div>
                    <FormikErrorMessage className="char__search-error" component="div" name="charName" />
                </Form>
            </Formik>
            {errorMessage}
            {result}
        </div>
    )
}


export default CharFormSearch;