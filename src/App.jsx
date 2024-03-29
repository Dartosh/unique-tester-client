import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import endpoints from './constants/endpoints';
import { logTypes } from './constants/logs';
import { init, listenNewLogs } from './services/socket';

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

  // Костыль от бесконечного useEffect
  // eslint-disable-next-line no-unused-vars
  const [getLogs, setGetLogs] = useState(false);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const socketConnect = init();

    listenNewLogs(socketConnect, setLogs);

    return () => socketConnect.disconnect();
  }, []);

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

  useEffect(() => {
    const getLogs = async () => {
      try {
        const res = await axios.get(
          endpoints.getLogs,
        );
  
        console.log('getLogs response:\n', res);

        setLogs(res.data?.logs);
      } catch (err) {
        console.log(err);
      }
    };

    getLogs();
  }, [getLogs]);

  const handleGetLogs = async () => {
    try {
      const res = await axios.get(
        endpoints.getLogs,
      );

      console.log('getLogs response:\n', res);

      setLogs(res.data?.logs);
    } catch (err) {
      console.log('handleGetLogs error:\n', err);

      setLogs((old) => {
        return [
          ...old,
          {
            id: 0,
            title: 'Ошибка',
            message: 'Не удалось загрузить логи системы.',
            type: logTypes.error,
          }
        ]
      });
    }
  }

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

      setLogs((old) => {
        return [
          ...old,
          {
            id: 0,
            title: 'Ошибка пользователя',
            message: 'Не удалось загрузить текста на проверку, проверьте введённые данные.',
            type: logTypes.error,
          }
        ]
      });
    }
  }

  const handleETxtSubmit = async (e) => {
    try {
      const res = await axios.post(
        endpoints.uploadEText,
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

      console.log('handleETxtSubmit response:\n', res);
    } catch (err) {
      console.log('handleETxtSubmit error:\n', err);

      setLogs((old) => {
        return [
          ...old,
          {
            id: 0,
            title: 'Ошибка пользователя',
            message: 'Не удалось загрузить текста на проверку, проверьте введённые данные.',
            type: logTypes.error,
          }
        ]
      });
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
      console.log('handleUpdateTable error:\n', err);

      setLogs((old) => {
        return [
          ...old,
          {
            id: 0,
            title: 'Ошибка пользователя',
            message: 'Не удалось обновить таблицу, проверьте введённые данные.',
            type: logTypes.error,
          }
        ]
      });
    }
  }

  const getLogClassName = (logStatus) => {
    switch (logStatus) {
      case logTypes.error:
        return 'log-error';
      case logTypes.success:
        return 'log-success';
      case logTypes.info:
        return 'log-info';
      default:
        return 'log-info'
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
                <label className='switch'>
                  <input type='checkbox' checked={isOnlyWordsCount} onChange={(e) => setIsOnlyWordsCount(e.target.checked)}/>
                  <span className='slider round'></span>
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
              <button className='submit-button' onClick={handleETxtSubmit} disabled={!isSubmitButtonActive}>Отправить на проверку в e-text.ru</button>
              <button className='submit-button' onClick={handleUpdateTable} disabled={!isUpdateTableButtonActive}>Выгрузить данные из таблицы</button>
            </div>
            <div className='logs-container'>
              {logs ? logs.map((log) => {
                return(
                  <div key={`log-${log.id}`} className={`log ${getLogClassName(log.type)}`}>
                    <h4 className='log__title'>
                      {log.title}
                    </h4>
                    <p className="log_message">
                      {log.message}
                    </p>
                  </div>
                );
              }).reverse() : <></>}
              
            </div>
            <button
              className='refresh-logs'
              onClick={handleGetLogs}
            >
                Обновить
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
