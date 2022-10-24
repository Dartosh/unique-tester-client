import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import endpoints from './constants/endpoints';

function App() {
  const [spreadsheetLink, setSpreadsheetLink] = useState('');
  const [rangeSheetTitle, setRangeSheetTitle] = useState('');
  const [columnCheckStatus, setColumnCheckStatus] = useState('');
  const [columnBkTitle, setColumnBkTitle] = useState('');
  const [columnDockLink, setColumnDockLink] = useState('');
  const [columnFirstAntiPlag, setColumnFirstAntiPlag] = useState('');
  const [columnSecondAntiPlag, setColumnSecondAntiPlag] = useState('');
  const [columnWordsNumber, setColumnWordsNumber] = useState('');
  // const [notifications, setNotifications] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isOnlyWordsCount, setIsOnlyWordsCount] = useState(false)

  const [isUpdateTableButtonActive, setIsUpdateTableButtonActive] = useState(false);
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false);

  useEffect(
    () => {
      if (spreadsheetLink && rangeSheetTitle) {
        setIsUpdateTableButtonActive(true);
      } else {
        setIsUpdateTableButtonActive(false);
      }

      if (
        spreadsheetLink &&
        rangeSheetTitle &&
        columnCheckStatus &&
        columnBkTitle &&
        columnDockLink &&
        columnFirstAntiPlag &&
        columnSecondAntiPlag &&
        columnWordsNumber
      ) {
        setIsSubmitButtonActive(true);
      } else {
        setIsSubmitButtonActive(false);
      }
    },
    [
      spreadsheetLink,
      rangeSheetTitle,
      columnCheckStatus,
      columnBkTitle,
      columnDockLink,
      columnFirstAntiPlag,
      columnSecondAntiPlag,
      columnWordsNumber
    ]
  );

  const handleTextRuSubmit = async (e) => {
    try {
      const res = await axios.post(
        endpoints.uploadTextRu,
        {
          spreadsheetId: spreadsheetLink.split('/')[5],
          rangeSheetTitle: String(rangeSheetTitle),
          columnCheckStatus: String(columnCheckStatus),
          columnBkTitle: String(columnBkTitle),
          columnDockLink: String(columnDockLink),
          clumnFirstAntiPlag: String(columnFirstAntiPlag),
          clumnSecondAntiPlag: String(columnSecondAntiPlag),
          clumnWordsNumber: String(columnWordsNumber),
          from: +from,
          to: +to,
          isOnlyWords: isOnlyWordsCount,
        },
      );

      console.log('handleTextRuSubmit response:\n', res);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateTable = async (e) => {
    try {
      const res = await axios.patch(
        endpoints.uploadTable,
        {
          spreadsheetId: spreadsheetLink.split('/')[5],
          rangeSheetTitle: String(rangeSheetTitle),
        },
      );

      console.log('handleUpdateTable response:\n', res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='app'>
      <header className='App-header'>
        <h1>unique-tester app</h1>
      </header>
      <main>
        <h2>Table info:</h2>
        <div className='workspace'>
          <div className='workspace__leftbar'>
            <div className='workspace__leftbar__labels'>
              <p>Ссылка на таблицу:</p>
              <p>Название листа:</p>
              <p>Колонка для статуса проверки:</p>
              <p>Колонка для названия документа:</p>
              <p>Колонка для ссылок:</p>
              <p>Колонка для результата <b>text.ru</b>:</p>
              <p>Колонка для результата <b>e-text.ru</b>:</p>
              <p>Колонка для кол-ва слов:</p>
            </div>
            <form className='workspace__leftbar__form'>
              <input type='text' value={spreadsheetLink} onChange={(e) => setSpreadsheetLink(e.target.value)}/>
              <input type='text' value={rangeSheetTitle} onChange={(e) => setRangeSheetTitle(e.target.value)}/>
              <input type='text' value={columnCheckStatus} onChange={(e) => setColumnCheckStatus(e.target.value)}/>
              <input type='text' value={columnBkTitle} onChange={(e) => setColumnBkTitle(e.target.value)}/>
              <input type='text' value={columnDockLink} onChange={(e) => setColumnDockLink(e.target.value)}/>
              <input type='text' value={columnFirstAntiPlag} onChange={(e) => setColumnFirstAntiPlag(e.target.value)}/>
              <input type='text' value={columnSecondAntiPlag} onChange={(e) => setColumnSecondAntiPlag(e.target.value)}/>
              <input type='text' value={columnWordsNumber} onChange={(e) => setColumnWordsNumber(e.target.value)}/>
            </form>
            <div className='workspace__leftbar__selectors'>
              <div className='workspace__leftbar__selectors_element'>
                <label class='switch'>
                  <input type='checkbox' checked={isOnlyWordsCount} onChange={(e) => setIsOnlyWordsCount(e.target.checked)}/>
                  <span class='slider round'></span>
                </label>
                <p>Получить только количество слов</p>
              </div>
              <div className='workspace__leftbar__selectors_element'>
                <p>От:</p>
                <input type='text' value={from} onChange={(e) => setFrom(e.target.value)}/>
              </div>
              <div className='workspace__leftbar__selectors_element'>
                <p>До:</p>
                <input type='text' value={to} onChange={(e) => setTo(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className='workspace__rightbar'>
            <div className="button-container">
              <button className='submit-button' onClick={handleTextRuSubmit} disabled={!isSubmitButtonActive}>Отправить на проверку в text.ru</button>
              <button className='submit-button' disabled={true}>Отправить на проверку в e-text.ru</button>
              <button className='submit-button' onClick={handleUpdateTable} disabled={!isUpdateTableButtonActive}>Выгрузить данные из таблицы</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
