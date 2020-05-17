import React from 'react';
import Navigation from "./Navigation.jsx";

// Это блок для вкладки "Помощь". Тоже ничего интересного
export default class Help extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <div className='column' style={{width: '180px'}}>
                    <Navigation/>
                </div>
                <div className='column' style={{width: '830px'}}>
                    <div className='block' style={{width:'780px', marginRight: '0'}}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '30px'}}>
                            <div style={{width: '60%', marginRight: '10px'}}>
                                <h1>Бронируйте место удаленно!</h1>
                                Не беспокойтесь о том, где Вы будете парковаться во время путешествий -
                                забронируйте место заранее.<br/><br/>
                                Выберите наиболее подходящее место в соответсвии с датой и временем приезда и отъезда.<br/><br/>
                                Мы работаем быстро и надежно!<br/><br/>
                                Вы можете забронировать место сейчас или на любой другой день!
                            </div>
                            <div style={{width: '30%', height: '180px',
                                backgroundImage: `url('./images/img1.jpg')`, backgroundSize: '100%'}}>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '30px'}}>
                            <div style={{width: '30%', height: '180px',
                                backgroundImage: `url('./images/img3.jpg')`, backgroundSize: '100%'}}>
                            </div>
                            <div style={{width: '60%', marginRight: '10px'}}>
                                <h1>Просматривайте маршрут до Вашего места!</h1>
                                Вы легко сможете просмотреть как проехать к Вашему месту на схеме и где мы располагаемся на карте.<br/><br/>
                                Зная расположение вашего места, Вы сможете легко ориентироваться на нашей парковке.<br/><br/>
                                Добирайтесь комфортно!
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div style={{width: '60%', marginRight: '10px'}}>
                                <h1>Парковка</h1>
                                Ваше парковочное место будет подготовлено и зарезервировано исключительно для Вас!<br/><br/>
                                У Вас всегда есть место чтобы вернуться.
                            </div>
                            <div style={{width: '30%', height: '200px',
                                backgroundImage: `url('./images/img4.jpg')`, backgroundSize: '100%'}}>
                            </div>
                        </div>
                    </div>
                    <div className='block' style={{width:'780px', marginRight: '0'}}>
                        <h1 style={{textAlign: 'left'}}>В случае проблем</h1>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px'}}>
                            <div style={{width: '30%', height: '150px',
                                backgroundImage: `url('./images/img5.jpg')`, backgroundSize: '100%'}}>
                            </div>
                            <div style={{width: '60%', marginRight: '10px'}}>
                                Вы сбились с пути и не можете найти парковочное место? <br/>
                                Вы забыли номер парковочного места? <br/>
                                Столкнулись с другими проблемами или у Вас есть вопросы? <br/>
                                К вашим услугам телефон горячей линии и онлайн-чат по электронной почте.<br/><br/>
                                <b>Горячая линия:</b> +02392893208<br/>
                                <b>Электронное письмо:</b> ууу@mail.ru
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}