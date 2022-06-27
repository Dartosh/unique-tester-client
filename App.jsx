import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [rangeSheetTitle, setRangeSheetTitle] = useState('');
  const [columnCheckStatus, setColumnCheckStatus] = useState('');
  const [columnBkTitle, setColumnBkTitle] = useState('');
  const [columnDockLink, setColumnDockLink] = useState('');
  const [columnFirstAntiPlag, setColumnFirstAntiPlag] = useState('');
  const [columnSecondAntiPlag, setColumnSecondAntiPlag] = useState('');
  const [columnWordsNumber, setColumnWordsNumber] = useState('');
  const [firstUids, setFirstUids] = useState([]);

  const getFirstUids = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        spreadsheetId,
        rangeSheetTitle,
        columnCheckStatus,
        columnBkTitle,
        columnDockLink,
        columnFirstAntiPlag,
        columnSecondAntiPlag,
        columnWordsNumber,
      })
    };
    
    console.log(JSON.stringify({
      spreadsheetId,
      rangeSheetTitle,
      columnCheckStatus,
      columnBkTitle,
      columnDockLink,
      columnFirstAntiPlag,
      columnSecondAntiPlag,
      columnWordsNumber,
    }));

    const response = await fetch('http://63.250.59.172/api/get-uids', requestOptions);

    const parsedResponse = await response.json();

    setFirstUids(parsedResponse.uids);

    console.log(parsedResponse.uids);
  }

  const handleFirstCheck = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstUids: firstUids.uids,
        spreadsheetId,
        rangeSheetTitle,
        columnCheckStatus,
        columnBkTitle,
        columnDockLink,
        columnFirstAntiPlag,
        columnSecondAntiPlag,
        columnWordsNumber,
      })
    };

    const response = await fetch('http://63.250.59.172/api/check-first', requestOptions);

    console.log(response);
  }

  return (
    <main>
      <form>
        <h1>Unique-tester</h1>
        <div>
          <label for="">ИД таблицы</label>
          <input
            type="text"
            id="status"
            name="spreadsheetId"
            value={spreadsheetId}
            onChange={(e) => {
              setSpreadsheetId(e.target.value)
            }}
          />
          <label for="">Лист таблицы</label>
          <input
            type="text"
            id="status"
            name="rangeSheetTitle"
            value={rangeSheetTitle}
            onChange={(e) => {
              setRangeSheetTitle(e.target.value)
            }}
          />
          <label for="">Колонка для статуса</label>
          <input 
            type="text"
            id="status"
            name="columnCheckStatus"
            value={columnCheckStatus}
            onChange={(e) => {
              setColumnCheckStatus(e.target.value)
            }}
          />
          <label for="">Колонка для названия документа</label>
          <input
            type="text"
            id="doc"
            name="columnBkTitle"
            value={columnBkTitle}
            onChange={(e) => {
              setColumnBkTitle(e.target.value)
            }}
          />
          <label for="">Колонка для ссылок</label>
          <input
            type="text"
            id="links"
            name="columnDockLink"
            value={columnDockLink}
            onChange={(e) => {
              setColumnDockLink(e.target.value)
            }}
          />
          <label for="">Колонка для первого плагиата</label>
          <input
            type="text"
            id="plag-1"
            name="clumnFirstAntiPlag"
            value={columnFirstAntiPlag}
            onChange={(e) => {
              setColumnFirstAntiPlag(e.target.value)
            }}
          />
          <label for="">Колонка для второго плагиата</label>
          <input
            type="text"
            id="plag-2"
            name="clumnSecondAntiPlag"
            value={columnSecondAntiPlag}
            onChange={(e) => {
              setColumnSecondAntiPlag(e.target.value)
            }}
          />
          <label for="">Колонка для кол-ва слов</label>
          <input
            type="text"
            id="words"
            name="clumnWordsNumber"
            value={columnWordsNumber}
            onChange={(e) => {
              setColumnWordsNumber(e.target.value)
            }}
          />
        </div>
        <button onClick={getFirstUids}>Загрузить на первый антиплагиат</button>
        <button disabled={true}>Загрузить на второй антиплагиат</button>
        <button onClick={handleFirstCheck}>Проверить на уникальность</button>
      </form>
    </main>
  );
}

export default App;
