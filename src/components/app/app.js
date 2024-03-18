import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import './app.css';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employeers-list/employeers-list';
import EmployeersAddForm from '../employeers-add-form/employeers-add-form';

class App extends Component{
     constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3}
            ], 
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) =>{ 
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) =>{
        if(term.length === 0  ) {
            return items;
        }

        return items.filter(item =>{
            return item.name.indexOf(term) > -1
        })
    };

    onUpdateSearch = (term) =>{
        this.setState({term});
    }

    filterPost = (items, filter) =>{
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    };

    onFilterSelect = (filter) => {
        this.setState({filter}); 
    };

    render(){
        const {data, term, filter} = this.state;
        const employeers = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
         return (
        <div className="app">
            <AppInfo
             employeers={employeers}
             increased ={increased}
             />

            <div className="search-panel">
                <SearchPanel
                 onUpdateSearch = {this.onUpdateSearch}/>
                <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
            </div>

                <EmployeesList 
                data={visibleData }
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>
                <EmployeersAddForm onAdd={this.addItem}/>

                
            </div>
    );
    }
}

export default App;