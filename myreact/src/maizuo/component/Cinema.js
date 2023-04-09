import React, { Component } from 'react'
import axios from 'axios'
import '../css/App.css' 

export default class Cinema extends Component {
    constructor() {
        super();

        this.state = {
            cinemaList: [],
            search: ''
        }

        axios({
            url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7307283',
            method: 'get',
            headers: {
                'X-Client-Info': '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16806547522579578832814081", "bc": "110100" }',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res =>
            this.setState({ cinemaList: res.data.data.cinemas, backendCinemaList: res.data.data.cinemas})
        )
    }

    render() {
        return (
            <div>
                <input value={this.state.search} onChange={(evt) => this.handleChange(evt)}></input>
                {
                    this.getCinemaList().map(item => 
                        <dl key={item.cinemaId}>
                            <dt>{item.name}</dt>
                            <dd>{item.address}</dd>
                        </dl>
                    )
                }
            </div>
        )
    }

    handleChange(evt){
        this.setState({search: evt.target.value});
    }

    getCinemaList() {
        let result = this.state.cinemaList.filter(item => 
            item.name.includes(this.state.search) || item.address.includes(this.state.search));
        return result;
    }
}
