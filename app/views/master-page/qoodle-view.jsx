import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import Riassunto from "components/riassunto";
import QVHeaderTable from "components/qv-header-table";
import QVFooterTable from "components/qv-footer-table";

class QoodleView extends Component
{

    constructor () {
        super();

        this.state = {
            isOpenMenu: false,
            currentValue: {},
            struct: [
                {
                    name: "Name",
                    type: "text"
                },
                {
                    name: "Number of person",
                    type: "number"
                },
                {
                    name: "Number of vegans",
                    type: "number"
                }
            ],
            elementsTable: [
                {
                    "Name": "Francesco",
                    "Number of person": 4,
                    "Number of vegans": 4
                },
                {
                    "Name": "Chiara",
                    "Number of person": 2,
                    "Number of vegans": 0
                },
                {
                    "Name": "Davide",
                    "Number of person": 1,
                    "Number of vegans": 0
                },

            ]
        };
    }


    handleChange(fieldName, event) {
       // var currentValue = this.state.currentValue;// se ho già qualcosa
       // currentValue[fieldName] = event.target.value;
        var result = {};
        for (var attrname in this.state.currentValue) { result[attrname] = this.state.currentValue[attrname]; }
        result[fieldName] = event.target.value;

        this.setState({currentValue: result});
        //console.log(fieldName);
        //console.log(event.target.value);
    }

    handleKeyPress(event)
    {
        //console.log(event.charCode);
        //console.log(Object.keys(this.state.currentValue).length);
        //console.log(this.state.currentValue + "   " + this.state.struct.length)
        //controllo che almeno 3 campi siano inizializzati
        if(event.charCode === 13  && Object.keys(this.state.currentValue).length === this.state.struct.length)
        {
            this.setState({elementsTable: this.state.elementsTable.concat([this.state.currentValue])});
        }

    }



    somma(itemKey, obj)
    {
        var sum = 0;
        //obj sono i dati dei partecipanti.
        //prop conterrà name, numberofperson etc
        //per ogni proprietà delloggetto (se sto considerando quella proprietà) &&  se è un numero lo sommo
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop) && itemKey === prop && typeof parseInt(obj[prop]) == "number") {
                sum += parseInt(obj[prop]);
            }
            else if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                sum += this.somma(itemKey, obj[prop]);
            }
        }
        return sum;
    }








    /* renderFooterTable()   {
        var footerItem = [];


        for(var i=0; i<this.state.struct.length; i++)
        {
            var somma;
            //per ogni elemento dell'array struct controllo il tipo(se number)
            //passo a somma il nome del campo, e l'array di elementi pieni (oggetti)
            somma = this.state.struct[i].type == "number" ? this.somma(this.state.struct[i].name, this.state.elementsTable) : "";

            //cambia l'i, cioè, a che "descrizione campo" siamo, ma ne prendo sempre il nome.
            //quindi poi ciclo sugli elements, ma ogni volta con lo stesso nome

            footerItem.push(<td scope="col">{somma}</td>)

        }

        return (<tr>{footerItem}</tr>);

    }*/

    renderCellTable()   {
        var cellItem = [];

        for(var i=0; i<this.state.struct.length; i++)
        {
            cellItem.push(<td> <input onChange={this.handleChange.bind(this, this.state.struct[i].name)} onKeyPress={this.handleKeyPress.bind(this)} type={this.state.struct[i].type} placeholder={this.state.struct[i].name} min={0} /></td>)

        }

        return (<tr>{cellItem}</tr>);
    }

    renderRigaTable(obj)
    {
        var riga = [];

            //pusho un array contenente ognuno il valore di un campo dell'oggetto(tra td)
            riga.push( Object.keys(obj).map((e) => <td>{obj[e]}</td>));

        return riga;
    }


    renderExampleTable()
    {
        var exampleItem = [];
        var elementi = this.state.elementsTable;

        for(var i=0; i<elementi.length; i++)
        {
            exampleItem.push( <tr>{this.renderRigaTable( elementi[i] )}</tr> ) ;
        }

        return (exampleItem)

    }







    render(){
        console.log(this.state.elementsTable);
            return (
                <div className="container">
                <div id="rowStats">
                <Riassunto struct={this.state.struct} elementsTable={this.state.elementsTable}/>
                </div>
                <table className="responsive-table">
                    <caption> A Christmas Dinner</caption>
                    <thead>
                    <QVHeaderTable struct={this.state.struct}/>
                    </thead>
                    <tfoot>

                    <QVFooterTable struct={this.state.struct} elementsTable={this.state.elementsTable}/>

                    </tfoot>
                    <tbody>
                    {this.renderCellTable()}
                    {this.renderExampleTable()}

                    </tbody>
                </table>
            </div>);

    }



}

export default QoodleView;