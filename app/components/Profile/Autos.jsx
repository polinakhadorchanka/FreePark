import React from 'react';
import {connect} from "react-redux";
import actions from "../../actions.jsx";
import DeleteIcon from '@material-ui/icons/Delete';
import MyDialog from "../Material/MyDialog.jsx";

class Autos extends React.Component {
    constructor(props) {
        super(props);

        this.renderAutos = this.renderAutos.bind(this);
        this.removeAuto = this.removeAuto.bind(this);
    }

    async removeAuto(e, auto) {
        let context = this,
            autos = await context.props.store.autos.filter((el) => el.id !== auto.id);

        context.props.addAuto(autos);

        // TODO: Запрос на сервер УДАЛЕНИЕ АВТО
        /*
        fetch(`/autos?userId=${context.props.store.user.id}&autoId=${auto.id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json()).then(async function (data) {
                if(data[0].errorCode === 0) {
                    context.addAuto(await context.props.store.autos.filter((el) => el.id !== auto.id));
                }
            })
            .catch(function (err) {
                console.log('EXP: ', err);
            });
         */
    }

    renderAutos() {
        let context = this;

        return (
            <table id='autosTable'>
                <tr>
                    <th width='219px' style={{borderLeft: 'none'}}>Марка</th>
                    <th width='219px'>Модель</th>
                    <th width='219px'>Номерной знак</th>
                    <th width='91px' style={{borderRight: 'none', backgroundColor: 'transparent'}}></th>
                </tr>
                {this.props.store.autos ? this.props.store.autos.map(function (auto) {
                    return(
                        <Auto auto={auto} removeAuto={context.removeAuto}/>
                    );
                }) : undefined}
            </table>
        );
    }

    render() {
        return (
            <div className='block' style={{width:'780px', marginRight: '0'}}>
                <h1 style={{textAlign: 'left'}}>Мои автомобили</h1>
                {this.props.store.autos.length > 0 ? this.renderAutos() : <h4 style={{textAlign: 'left'}}>Вы еще не добавили ни одного автомобиля</h4>}
            </div>
        );
    }
}

class Auto extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr key={this.props.auto.id}>
                <td style={{borderLeft: 'none'}}>{this.props.auto.mark}</td>
                <td>{this.props.auto.model}</td>
                <td>{this.props.auto.number}</td>
                <td style={{border: 'none', backgroundColor: 'transparent', textAlign: 'left'}}>
                    <MyDialog button={<DeleteIcon className='deleteAuto'/>}
                              message={'Вы не сможете в последующем отменить это действие'}
                              agree={this.props.removeAuto} id={this.props.auto}/></td>
            </tr>
        );
    }
}

function mapStateToProps(state) {
    return {
        store: state
    };
}

const Connected = connect(mapStateToProps, actions) (Autos);

class Export extends React.Component {
    render(){
        return (<Connected/>);
    }
}

export default Export;