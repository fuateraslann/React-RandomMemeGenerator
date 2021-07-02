import React, { useState ,Component } from "react"

export default  class MemeGenerator extends Component {
    constructor() {
        super();
        this.state = {
            topText: '',
            bottomText: '',
            Img: 'http://i.imgflip.com/1bij.jpg',
            imgsMeme: [],
            topFlag : 0,
            bottomFlag :0
        };
        this.handleChangeTop = this.handleChangeTop.bind(this)
        this.handleChangeBottom = this.handleChangeBottom.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                console.log(memes[0])
                this.setState({ MemeImgs: memes })
            })
    }
    handleChangeTop(e) {
        e.preventDefault()
        this.setState({topFlag : 0});

        const {name, value} = e.target
        this.setState({ [name]: value })
    }
    handleChangeBottom(e) {
        e.preventDefault()
        this.setState({bottomFlag : 0});
        const {name, value} = e.target
        this.setState({ [name]: value })
    }
    handleSubmit(event) {
        event.preventDefault()
        if(this.state.bottomText !== '')
            this.setState({bottomFlag : 1});
        if(this.state.topText !== '')
            this.setState({topFlag : 1});
        const randNum = Math.floor(Math.random() * this.state.MemeImgs.length)
        const randMemeImg = this.state.MemeImgs[randNum].url
        this.setState({ Img: randMemeImg })
    }
    render() {
        return (
            <div className="meme-container">
                    <form className="form" >
                        <input
                            type="text"
                            name="topText"
                            placeholder="Top Text"
                            value={this.state.topText}
                            onChange={this.handleChangeTop}
                        />
                        <input
                            type="text"
                            name="bottomText"
                            placeholder="Bottom Text"
                            value={this.state.bottomText}
                            onChange={this.handleChangeBottom}
                        />
                        <button onClick={this.handleSubmit}>GENERATE</button>
                    </form>
                <div className="meme">
                    <img src={this.state.Img}  />
                    {this.state.topFlag === 0 ? "" :
                        <h2 className="top">{this.state.topText}</h2>}
                    {this.state.bottomFlag === 0 ? "" :
                        <h2 className="bottom">{this.state.bottomText}</h2>}
                </div>
            </div>
        )
    }
}