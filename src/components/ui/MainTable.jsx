import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
// import data from '../../db/data.json';
import WordList from './WordList';

function MainTable({dayId}) {
  // console.log(data)

  const [data, setData] = useState();
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/words?day=${dayId}`) // 주소에서 데이터 받아와서
    .then(res => res.json()) // 받아온 것을 json 형태로 변경
    .then(temp => {
      console.log(temp);
      setData(temp);
    }) // setData를 이용해서 data에 옮긴다
    .catch(err => console.log(err)); // 오류나면 콘솔에 표시
  }, [isCheck]); // 의존성 배열에 들어있는 값이 변동되면 다시 렌더링, []가 없으면 무한 반복, []는 처음 렌더링 시 한 번만 실행

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>check</th>
          <th>eng</th>
          <th>kor</th>
          <th>controller</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.map(word => (
            <WordList
              key={word.id}
              word={word}
              isCheck={isCheck}
              setIsCheck={setIsCheck}
            />
          ))
        }
      </tbody>
    </Table>
  );
}

export default MainTable;