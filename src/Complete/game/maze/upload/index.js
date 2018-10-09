import React from "react";
import {Upload,Icon,Button,message} from 'antd';
import {url} from '../../../../Request'
require("./style.less")

export default class upload extends React.PureComponent {
    state={
    }
	async UNSAFE_componentWillMount() {
    }
    handleChange=(info)=>{
        if (info.file.status !== 'uploading') {
          console.log(info);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
    }
	render(){
		return (
            <div>
                <div className="upload">
                <Upload
                    action={url+'/game/maze/upload'}
                    name= 'file'
                    onChange={this.handleChange}
                >
                    <Button>
                        <Icon type="upload" />上传图片
                    </Button>
                </Upload>
                </div>
            </div>
		);
	}
}
