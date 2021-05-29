import React, { Component } from 'react';
import axios from 'axios';


var arrdata = [];
class Commentbox extends Component {
    constructor(props) {
        super(props);
        window.commentbox = this;
        this.state = {
            commentval: "",
            id: 0,
            commentdata: [],
            mode: 'add',
            unqid: null
        };
    }
    componentDidMount() {
        axios.get('https://randomuser.me/api/').then(res => {
            console.log(res);
        });
    }
    onComment = (evt) => {
        this.setState({ commentval: evt.target.value, id: this.state.id + 1 });
    }
    onCommentClick = () => {
        if (this.state.mode === 'add') {
            let commenttext = this.state.commentval;
            let id = this.state.id
            let commentobj = { comment: commenttext, unqid: id };
            arrdata.push(commentobj);
            this.setState({ commentdata: arrdata, commentval: '' });
        }
        else {
            let id = this.state.unqid;
            let filterdata = this.state.commentdata.filter(item => { return item.unqid === parseInt(id) });
            filterdata[0].comment = this.state.commentval;
            this.setState({ commentdata: this.state.commentdata, commentval: '', mode: 'add' });
        }
    }
    editClick = (evt) => {
        this.setState({ commentval: evt.target.dataset.comment, unqid: evt.target.dataset.id, mode: 'edit' });
    }
    deleteClick = (evt) => {
        let filterdata = this.state.commentdata.filter(item => { return item.unqid !== parseInt(evt.target.id) });
        arrdata = filterdata;
        this.setState({ commentdata: filterdata });
    }
    renderList = () => {
        return this.state.commentdata.map(commentdata => {
            return (
                <div className="item" key={commentdata.unqid}>
                    <i className="large middle aligned icon user" />
                    <div className="content">
                        <div className="description">
                            {commentdata.comment}
                            <div className="ui two buttons">
                                <div className="ui basic green button" data-comment={commentdata.comment} data-id={commentdata.unqid} onClick={this.editClick}>Edit</div>
                                <div className="ui basic red button" id={commentdata.unqid} onClick={this.deleteClick}>Delete</div>
                            </div>
                        </div>
                    </div>
                </div >)
        });
    }
    render() {
        return (
            <React.Fragment>
                <div className="txt-a-box">
                    <textarea name="comments" id="comments" className="comments" onChange={this.onComment} value={this.state.commentval} />
                    <button className="ui basic green button btn-sz" onClick={this.onCommentClick}>Submit</button>
                </div>
                <div className="ui relaxed divided list">
                    {this.state.commentdata.length !== 0 ?
                        this.renderList() : null}
                </div>

            </React.Fragment>
        );
    }

}

export default Commentbox;