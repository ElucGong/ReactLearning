import React, { useContext, useEffect, useReducer } from 'react'
import axios from 'axios'

const GlobalContext = React.createContext();

const initialState = {
    info: '',
    filmList: []
};

const reducer = (prevState, action) => {
    let newState = { ...prevState };
    switch (action.type) {
        case 'change-filmList':
            newState.filmList = action.value;
            return newState;
        case 'change-info':
            newState.info = action.value;
            return newState;
        default:
            return prevState;
    }
};

export default function Film() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=1471518',
            method: 'get',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16812693952946308910350337"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res =>
            dispatch({
                type: 'change-filmList',
                value: res.data.data.films
            })
        );

    }, []);

    return (
        <GlobalContext.Provider value={
            {
                state,
                dispatch
            }
        }>
            <div>
                {
                    state.filmList.map(item =>
                        <FilmItem key={item.filmId} {...item}>
                        </FilmItem>
                    )
                }
                <FilmDetail></FilmDetail>
            </div>
        </GlobalContext.Provider>
    );
}

function FilmItem(props) {
    const { name, poster, grade, synopsis } = props;
    const { dispatch } = useContext(GlobalContext);

    const handleClick = () => dispatch({
        type: 'change-info',
        value: synopsis
    });

    return (
        <div className='filmItem' onClick={handleClick}>
            <img src={poster} alt={name} />
            <h4>{name}</h4>
            <div>观众评分：{grade}</div>
        </div>
    );
}

function FilmDetail() {
    const { state } = useContext(GlobalContext);
    return (
        <div className='filmDetail'>
            detail-{state.info}
        </div>
    );
}
