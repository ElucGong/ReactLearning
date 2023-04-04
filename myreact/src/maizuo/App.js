import React, { Component } from 'react'
import Film from './component/Film';
import Cinema from './component/Cinema';
import Mine from './component/Mine';
import './css/App.css'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            list: [{
                id: 1,
                name: '电影'
            }, {
                id: 2,
                name: '影院'
            }, {
                id: 3,
                name: '我的'
            }],
            current: 0
        };
    }

    which() {
        switch (this.state.current) {
            case 0:
                return <Film />;
            case 1:
                return <Cinema />;
            case 2:
                return <Mine />;
        }
    }

    handleClick(index) {
        this.setState(
            { current: index }
        )
    }

    render() {
        return (
            <div>
                {this.which()}

                <ul>
                    {this.state.list.map(
                        (item, index) =>
                            <li
                                key={item.id}
                                className={index === this.state.current ? 'active' : ''}
                                onClick={() => this.handleClick(index)}
                            >
                                {item.name}
                            </li>
                    )}
                </ul>
            </div>
        )
    }
}
