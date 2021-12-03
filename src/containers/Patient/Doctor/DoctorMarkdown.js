import React, { Component} from 'react';
import { connect } from 'react-redux';
import { getMarkdownDoctor } from '../../../services/userService';

class DoctorMarkdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markdown: {}
        }
    }
    
    async componentDidMount() {
        if(this.props.param) {
            let res = await getMarkdownDoctor(this.props.param);
            this.setState({
                markdown: res.markdown
            })
        }
    }

    render() {
        let {markdown} = this.state;
        return (
            <div className="container">
                <h5 style={{fontWeight: 'bold'}}>
                    Chức vụ
                </h5>
                <div 
                                
                    dangerouslySetInnerHTML={{__html: markdown?.Markdown && markdown.Markdown.contentHTML}}
                >    
                </div>
            </div>                                          
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorMarkdown);