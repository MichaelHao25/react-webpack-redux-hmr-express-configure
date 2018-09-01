import React from "react";
import classnames from "classnames";



class GameForm extends React.Component {


    //

    // 生命周期学习
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps');
    //     nextProps.game.length != 0 && this.setState({
    //         _id: nextProps.game[0]._id,
    //         title: nextProps.game[0].title,
    //         url: nextProps.game[0].url,
    //     })
    //     //因为是数组所以要加下标
    // }
    //从状态里面调整需要一个生命周期函数
    //因为设置状态是异步的所以调用次生命周期函数当props发生变化时执行
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps, prevState);
        var state = null
        state = nextProps.game.length != 0 ? {
            _id: nextProps.game[0]._id,
            title: nextProps.game[0].title,
            url: nextProps.game[0].url,
        }:null;
        return state;
    }
    // componentWillUpdate(nextProps, prevState) {
    //     console.log(nextProps, prevState);

    //     console.log('组件实例化以后')
    // }

    constructor(props) {
        super(props)
        console.log('构造函数');
        this.state = {
            _id: '',
            title: '',
            url: '',
            errors: {},
            loading: false,
        }
        //从状态里面调整
    }
    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        if (this.state.title === '') { errors.title = 'Can\'t be empty.'; }
        if (this.state.url === '') { errors.url = 'Can\'t be empty.'; }
        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { title, url, _id } = this.state;
            this.setState({
                loading: true
            });
            this.props.saveGame({ title, url, _id }).catch((err) => {
                return err.response.json().then(({ errors }) => { this.setState({ errors, loading: false }) })
            })
        }
    }
    render() {
        const form = (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={(e) => { this.handleSubmit(e) }}>
                <h1>Add New Games</h1>
                {!!this.state.errors.global && <div className="ui negative message">{this.state.errors.global}</div>}
                <div className={classnames('field', { error: !!this.state.errors.title })}>
                    <label htmlFor="title">Title</label>
                    <input type="text"
                        name="title"
                        value={this.state.title}
                        onChange={(e) => { this.handleChange(e) }}
                    />
                    <span>{this.state.errors.title}</span>
                </div>
                <div className={classnames('field', { error: !!this.state.errors.url })}>
                    <label htmlFor="title">Cover Url</label>
                    <input type="text"
                        value={this.state.url}
                        name="url"
                        onChange={(e) => { this.handleChange(e) }}
                    />
                    <span>{this.state.errors.url}</span>
                </div>
                <div className="field">
                    {this.state.url ? <img src={this.state.url} alt="" className="ui small bordered image" /> : ''}
                </div>
                <div className="field">
                    <button className="ui primary button">Save</button>
                </div>
            </form>
        )
        return (
            <div>
                {form}
            </div>
        )
    }
}
export default GameForm;




// let title, url;
// return (
//     <form action="?" className="ui form">
//         <h1>Add New Games</h1>
//         <div className="field">
//             <label htmlFor="title">Title</label>
//             <input type="text" ref={(node) => title = node} />
//         </div>
//         <div className="field">
//             <label htmlFor="title">Cover Url</label>
//             <input type="text" ref={(node) => url = node} />
//         </div>
//         <div className="field">
//             <img src="" alt="" className="ui small bordered image" />
//         </div>
//         <div className="field">
//             <button className="ui primary button" onClick={(e) => {
//                 e.preventDefault();
//                 console.log(title, url)
//             }}>Save</button>
//         </div>
//     </form>
// )