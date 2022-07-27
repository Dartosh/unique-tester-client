import './App.css';
import { useState } from 'react';

function App() {
  const [spreadsheetLink, setSpreadsheetLink] = useState('');
  const [rangeSheetTitle, setRangeSheetTitle] = useState('');
  const [columnCheckStatus, setColumnCheckStatus] = useState('');
  const [columnBkTitle, setColumnBkTitle] = useState('');
  const [columnDockLink, setColumnDockLink] = useState('');
  const [columnFirstAntiPlag, setColumnFirstAntiPlag] = useState('');
  const [columnSecondAntiPlag, setColumnSecondAntiPlag] = useState('');
  const [columnWordsNumber, setColumnWordsNumber] = useState('');
  const [firstUids, setFirstUids] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(5);

  const getFirstUids = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        spreadsheetLink,
        rangeSheetTitle,
        columnCheckStatus,
        columnBkTitle,
        columnDockLink,
        columnFirstAntiPlag,
        columnSecondAntiPlag,
        columnWordsNumber,
        from,
        to,
      })
    };

    try {
      const response = await fetch('http://63.250.59.172/api/get-uids', requestOptions);

      const parsedResponse = await response.json();

      setFirstUids(parsedResponse.uids);
    } catch (error) {
      const newNotifications = notifications;
      newNotifications.push({
        title: 'Ошибка',
        text: 'Не удалось загрузить текста на text.tu',
        isError: true,
      });
      setNotifications(newNotifications);
    }
  }

  const handleFirstCheck = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstUids: firstUids.uids,
        spreadsheetLink,
        rangeSheetTitle,
        columnCheckStatus,
        columnBkTitle,
        columnDockLink,
        columnFirstAntiPlag,
        columnSecondAntiPlag,
        columnWordsNumber,
        from,
        to,
        
      })
    };

    const response = await fetch('http://63.250.59.172/api/check-first', requestOptions);

    console.log(response);
  }

  const checkGetUidsButton = () => {
    if (
      spreadsheetLink === '' ||
      rangeSheetTitle === '' ||
      columnCheckStatus === '' ||
      columnBkTitle === '' ||
      columnDockLink === '' ||
      columnFirstAntiPlag === '' ||
      columnSecondAntiPlag === '' ||
      columnWordsNumber === ''
    ) {
      return true;
    }

    return false;
  }

  return (
    <main>
      <div className='notifications'>
        {notifications.map((notif, id) => (
          <div className='notifications_push' key={`push-${id}`}>
            <h3 key={`push-title-${id}`}>{notif.title}</h3>
            <p key={`push-text-${id}`}>{notif.text}</p>
          </div>
          )
        )}
      </div>
      <form className='params-form'>
        <h1 className='params-form__title'>Unique-tester</h1>
        <div className='params-form__fields'>
          <label className='params-form__fields__label'>Ссылка на таблицу</label>
          <input
            type='text'
            id='status'
            name='spreadsheetId'
            value={spreadsheetLink}
            className='params-form__fields__input'
            onChange={(e) => {
              setSpreadsheetLink(e.target.value)
            }}
          />
          <label className='params-form__fields__label'>Лист таблицы</label>
          <input
            type='text'
            id='status'
            name='rangeSheetTitle'
            value={rangeSheetTitle}
            className='params-form__fields__input'
            onChange={(e) => {
              setRangeSheetTitle(e.target.value)
            }}
          />
          <label className='params-form__fields__label'>Колонка для статуса</label>
          <input 
            type='text'
            id='status'
            name='columnCheckStatus'
            value={columnCheckStatus}
            className='params-form__fields__input'
            onChange={(e) => {
              setColumnCheckStatus(e.target.value)
            }}
          />
          <label className='params-form__fields__label'>Колонка для названия документа</label>
          <input
            type='text'
            id='doc'
            name='columnBkTitle'
            value={columnBkTitle}
            className='params-form__fields__input'
            onChange={(e) => {
              setColumnBkTitle(e.target.value)
            }}
          />
          <label className='params-form__fields__label'>Колонка для ссылок</label>
          <input
            type='text'
            id='links'
            name='columnDockLink'
            value={columnDockLink}
            className='params-form__fields__input'
            onChange={(e) => {
              setColumnDockLink(e.target.value)
            }}
          />
          
          <label className='params-form__fields__label'>Колонка для первого плагиата</label>
          <input
            type='text'
            id='plag-1'
            name='clumnFirstAntiPlag'
            value={columnFirstAntiPlag}
            className='params-form__fields__input'
            onChange={(e) => {
              setColumnFirstAntiPlag(e.target.value)
            }}
          />
          <label className='params-form__fields__label'>Колонка для второго плагиата</label>
          <input
            type='text'
            id='plag-2'
            name='clumnSecondAntiPlag'
            value={columnSecondAntiPlag}
            className='params-form__fields__input'
            onChange={(e) => {
              setColumnSecondAntiPlag(e.target.value)
            }}
          />
          <label className='params-form__fields__label'>Колонка для кол-ва слов</label>
          <input
            type='text'
            id='words'
            name='clumnWordsNumber'
            value={columnWordsNumber}
            className='params-form__fields__input'
            onChange={(e) => {
              setColumnWordsNumber(e.target.value)
            }}
          />
          <div className='tofrom'>
            <label className='params-form__fields__label tofrom__label'>Начиная с документа No</label>
            <input
              type='text'
              id='words'
              name='clumnWordsNumber'
              value={from}
              className='params-form__fields__input tofrom__input'
              onChange={(e) => {
                setFrom(e.target.value)
              }}
            />
          </div>
          <div className='tofrom'>
            <label className='params-form__fields__label tofrom__label'>Заканчивая документом No</label>
            <input
              type='text'
              id='words'
              name='clumnWordsNumber'
              value={to}
              className='params-form__fields__input tofrom__input'
              onChange={(e) => {
                setTo(e.target.value)
              }}
            />
          </div>
        </div>
        <button disabled={checkGetUidsButton()} onClick={getFirstUids}>Загрузить на первый антиплагиат</button>
        <button disabled={true}>Загрузить на второй антиплагиат</button>
        <button 
          disabled={firstUids.length === 0}
          onClick={handleFirstCheck}
        >Проверить на уникальность</button>
      </form>
    </main>
  );
}

export default App;
