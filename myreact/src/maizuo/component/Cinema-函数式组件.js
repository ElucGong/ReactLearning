import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

function useCinemaList() {
    const [cinemaList, setCinemaList] = useState([]);

    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7307283',
            method: 'get',
            headers: {
                'X-Client-Info': '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16806547522579578832814081", "bc": "110100" }',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res =>
            setCinemaList(res.data.data.cinemas)
        );

    }, []);

    return { cinemaList };
}

function useFilter(cinemaList, search) {
    const getCinemaList = useMemo(
        () => cinemaList.filter(item =>
            item.name.includes(search) || item.address.includes(search)),
        [cinemaList, search]
    );

    return { getCinemaList };
}

export default function Cinema() {
    const [search, setSearch] = useState('');
    const { cinemaList } = useCinemaList();
    const { getCinemaList } = useFilter(cinemaList, search);

    const handleChange = (evt) => setSearch(evt.target.value);

    return (
        <div>
            <input value={search} onChange={handleChange}></input>
            {
                getCinemaList.map(item =>
                    <dl key={item.cinemaId}>
                        <dt>{item.name}</dt>
                        <dd>{item.address}</dd>
                    </dl>
                )
            }
        </div>
    );
}

