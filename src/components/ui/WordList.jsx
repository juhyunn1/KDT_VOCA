import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function WordList({word, isCheck, setIsCheck}) {
  const [isView, setIsView] = useState(false);

  const handleView = () => {
    setIsView(!isView); // isView를 반대로 바꾼다
  }

  // check 상태 설정
  const handleCheck = () => {
    fetch(`http://localhost:3001/words/${word.id}`, { // word.id에 해당되는 데이터에 접근해서
      method: 'PUT', // update
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...word, // spread 연산자, 기존의 값을 다 가져와서
        isDone: !word.isDone // 이거만 바꾼다
      })
    })
    .then(res => {
      console.log(res);
      if(res.ok) // 정상 실행되면
        setIsCheck(!isCheck); // isCheck값을 바꿔준다, 자식이 부모에게 바뀐 상태 전달
    })
  }

  // 삭제
  const handleDelete = () => {
    fetch(`http://localhost:3001/words/${word.id}`, { // word.id에 해당되는 데이터에 접근해서
      method: 'DELETE', // delete
    })
    .then(res => {
      console.log(res);
      if(res.ok) // 정상 실행되면
        setIsCheck(!isCheck); // isCheck값을 바꿔준다, 자식이 부모에게 바뀐 상태 전달
    })
    .catch(err => console.log(err));
  }
  
  return (
    <tr key={word.id}>
      <td>{word.id}</td>
      <td>
        <Form>
          <Form.Check
            type='checkbox'
            // disabled={word.isDone} // 체크박스 활성화 여부
            defaultChecked={word.isDone}
            onChange={handleCheck}
          />
        </Form>
      </td>
      <td>{word.eng}</td>
      <td>{isView ? word.kor : ""}</td>
      <td>
        <Button variant="primary" onClick={handleView} style={{ marginRight:'15px' }}>
          {isView ? "숨기기" : "보기"}
        </Button>
        <Button variant="secondary" onClick={handleDelete}>삭제</Button>
      </td>
    </tr>
  );
}

export default WordList;