import React from 'react';

// Это информационные блоки на стартовой странице, ничего интересного
export default class Info extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='block' style={{width:'600px', marginRight: '0'}}>
                {this.props.block === '1' ?
                    <div>
                        <h1>Бронирование онлайн! Идеальная парковка для Вашего автомобиля!</h1>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div style={{width: '30%'}}>
                                <div style={{backgroundImage: `url('./images/img1.jpg')`, backgroundSize: '100%',
                                    height: '180px', marginBottom: '10px'}}>
                                </div>
                                <div>
                                    <b>Бронирование</b> <br/>
                                    Введите, когда Вы хотите забронировать место и увидите схему парковки.
                                    Выберите на ней удобное для Вас место и бронируйте онлайн!
                                </div>
                            </div>
                            <div style={{width: '30%'}}>
                                <div style={{backgroundImage: `url('./images/img3.jpg')`, backgroundSize: '100%',
                                    height: '180px', marginBottom: '10px'}}>
                                </div>
                                <div>
                                    <b>Маршрут к месту</b> <br/>
                                    Карта проезда к парковке. Информация и маршрут на схеме к Вашему парковочному месту.
                                    Добирайтесь комфортно!
                                </div>
                            </div>
                            <div style={{width: '30%'}}>
                                <div style={{backgroundImage: `url('./images/img2.jpg')`, backgroundSize: '100%',
                                    height: '180px', marginBottom: '10px'}}>
                                </div>
                                <div>
                                    <b>Парковка</b> <br/>
                                    Удобное расположение парковочных мест. Парковка работает круглосуточно.
                                    Паркуйтесь вместе с нами!
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        Забронируйте место заранее. Вы сэкономите время, нервы и деньги.
                        С нами Вы всегда удобно припаркуетесь в заданном месте.
                        Вы заранее знаете, как выглядит парковка и место для парковки всегда будет готово для Вас!
                    </div>
                }
            </div>
        );
    }
}