import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { Col, Divider, Row } from "antd";
import { Input } from "antd";

import "./App.css";
import MyButton from "./components/MyButton";

const { TextArea } = Input;

function App() {
  const [users, setUsers] = useState(null);
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const inputRef = useRef();
  const textRef = useRef();

  const buttonHandler = () => {
    setInputValue(inputRef.current.value);
    setTextValue(textRef.current.value);

    console.log(inputRef.current);
    console.log(textRef.current);
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (response.status == 200) {
        setUsers(response.data);
      }
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [postDetail, setPostDetail] = useState({
    title: { inputValue },
    description: { textValue },
    userId: 1,
  });

  const createPost = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          ...postDetail,
        }
      );

      console.log(response);
      setMessage('Post created');
    } catch (error) {
      console.log(error);
    }
  };

  // const [post, setPost] = useState(null);

  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/posts/1').then((response) => {
  //     setPost(response.data);
  //   });
  // }, []);

  // function deletePost() {
  //   axios
  //     .delete('https://jsonplaceholder.typicode.com/posts/1')
  //     .then(() => {
  //       alert("Post deleted!");
  //       setPost(null)
  //     });
  //   }
  

  return (
    <>
      <div className="App">
        <h1>Request data with axios</h1>
        <Row gutter={8}>
          {users?.map((user) => (
            <Col className="gutter-row" span={8}>
              <div
                style={{
                  width: "150px",
                  margin: "25px",
                  width: "50%",
                  height: "250px",
                  border: "2px black solid",
                  textAlign: "center",
                  paddingTop: "15px",
                }}
                key={user.id}
              >
                {" "}
                {user.name}
                <br />
                {user.phone}
                <br />
                {user.email}
                <br />
                {user.website}
              </div>
            </Col>
          ))}
        </Row>
        <Divider />

        <Row gutter={8}>
          <Col span={8}></Col>
          <Col span={8}>
            <h1>Create request data with axios</h1>
            <p>Value from input - {inputValue}</p>
            <p>Value from textarea - {textValue}</p>
            <Input
              placeholder="Title"
              allowClear
              className="input"
              ref={inputRef}
              type="text"
            />
            <br />

            <br />
            <TextArea
              showCount
              maxLength={100}
              style={{ height: 120, marginBottom: 24 }}
              placeholder="Description"
              ref={textRef}
              type="text"
            />
            <MyButton fungsi={buttonHandler} namaFungsi="set" />
            <MyButton fungsi={createPost} namaFungsi="+" />
          </Col>
          <Col span={8}></Col>
        </Row>

        <Row gutter={8}>
          <Col span={8}></Col>
          <Col span={8}>
            <h1>put request data with axios</h1>
            <Input
              placeholder="Title"
              allowClear
              className="input"
              type="text"
            />
            <br />

            <br />
            <TextArea
              showCount
              maxLength={100}
              style={{ height: 120, marginBottom: 24 }}
              placeholder="Description"
              type="text"
            />
            <MyButton fungsi={buttonHandler} namaFungsi="put" />
            <p>{message}</p>
          </Col>
          <Col span={8}></Col>
        </Row>

      {/* <Row gutter={8}>
          <Col span={8}></Col>
          <Col span={8}>
            <h1>delete request data with axios</h1>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <button onClick={deletePost}>Delete Post</button>
          </Col>
          <Col span={8}></Col>
        </Row> */}

      </div>
    </>
  );
}

export default App;
