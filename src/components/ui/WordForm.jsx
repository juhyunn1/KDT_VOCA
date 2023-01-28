import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function WordForm() {
  const navigate = useNavigate(); // 특정 행동을 했을 때 해당 주소로 이동
  
  // 단어 추가를 위한 객체 생성
  const [word, setWord] = useState(
    {
      id: 0,
      day: 0,
      eng: '',
      kor: '',
      isDone: false
    }
  );

  useEffect(() => {
    console.log(word);
  }, [word])

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setWord({...word, [e.target.name]: e.target.value}); // e.target.name은 eng/kor
    console.log(word)
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작 방지, submit에서는 새로고침 방지

    // // 다음 id 설정
    // let nextId;

    // fetch('http://localhost:3001/words')
    // .then(res => res.json())
    // .then(temp => {
    //   // console.log(temp);
    //   nextId = temp.length+1;
    //   // console.log(id);
    // })
    // .catch(err => console.log(err));

    // // 추가
    // fetch('http://localhost:3001/words', {
    //   method: 'POST', // create
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }, 
    //   body: JSON.stringify({
    //     ...word, id : nextId
    //   })
    // })
    // .then(res => {
    //   console.log(res);
    // })
    // .catch(err => console.log(err));

    fetch('http://localhost:3001/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        day: word.day,
        eng: word.eng,
        kor: word.kor,
        isDone: word.isDone
      })
    }).then(res => {
      console.log(res);
      alert("단어가 추가되었습니다.")
      navigate("/"); // 단어 추가되면 홈으로 이동
    }).catch(err => console.log(err));
  
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>English</Form.Label>
        <Form.Control type="text" placeholder="영어단어를 입력하세요" name="eng" onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Korean</Form.Label>
        <Form.Control type="text" placeholder="뜻을 입력하세요" name="kor" onChange={handleChange}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        추가
      </Button>
    </Form>
  );
}

export default WordForm;