import React, { Component } from 'react'
import './App.css'
import jsonp from 'fetch-jsonp'

export default class App extends Component {
    state = {'key':'0'}
    loadedJSON = (res) => this.setState(res)
    getHoroscope = (date) => {
        const URI = 'http://api.jugemkey.jp/api/horoscope/free/jsonp/'

        jsonp(URI + date)
            .then(res => res.json())
            .then(this.loadedJSON)

    }
    componentWillMount () {
        this.getHoroscope('')
    }
    render() {
        console.log(this.state)
        if (!this.state.horoscope) return <div className='App' />
        return (
            <div className="App">
                <NormalView data={this.state.horoscope['2019/02/27'][this.state.key]} />
                <select onChange={e => this.doChange(e)}>
            <option value="0" key="0">牡羊座</option>
            <option value="1" key="1">牡牛座</option>
            <option value="2" key="2">双子座</option>
            <option value="3" key="3">蟹座</option>
            <option value="4" key="4">獅子座</option>
            <option value="5" key="5">乙女座</option>
            <option value="6" key="6">天秤座</option>
            <option value="7" key="7">さそり座</option>
            <option value="8" key="8">射手座</option>
            <option value="9" key="9">山羊座</option>
            <option value="10" key="10">水瓶座</option>
            <option value="11" key="11">魚座</option>
        </select>
            </div>
        )
    }
    doChange (e) {
        this.setState({key: e.target.value})
    }
}

const NormalView = props => {
    let strdata = JSON.stringify(props.data)

    return (
        <div>
            <font size='4'><p>出来事：{props.data.content}</p></font>
            <font size='4'><p>ラッキーアイテム：{props.data.item}</p></font>
            <font size='4'><p>ラッキーカラー：{props.data.color}</p></font>
            <font size='4'><p>金運：{props.data.money}</p></font>
            <font size='4'><p>仕事運：{props.data.job}</p></font>
            <font size='4'><p>恋愛運：{props.data.love}</p></font>
            <font size='5'><p>ランキング：今日のあなたの順位は<font color='red'>{props.data.rank}</font>位</p></font>
        </div>
    )
}
