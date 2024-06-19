import {useParams} from 'react-router-dom';
import {useState, useEffect} from "react";

import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);

    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateComponent();
    }, [id]);

    const updateComponent = () => {
        clearError();
        switch (dataType){
            case 'comic': getComic(id).then(onDataLoaded);
                break
            case 'char': getCharacter(id).then(onDataLoaded);
                break
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}
export default SinglePage;