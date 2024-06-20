import {useParams} from 'react-router-dom';
import {useState, useEffect} from "react";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);

    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComponent();
    }, [id]);

    const updateComponent = () => {
        clearError();
        switch (dataType){
            case 'comic': getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break
            case 'char': getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }


    return (
        <>
            {setContent(process, Component, data)}
        </>
    )
}
export default SinglePage;