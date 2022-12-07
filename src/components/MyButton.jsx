import react from "react";

import { Button } from 'antd';


const MyButton = (props) => {


    return <Button style={{float: 'center'}} onClick={props.fungsi} type="primary" shape="circle">
        {props.namaFungsi}</Button>

};


export default MyButton;