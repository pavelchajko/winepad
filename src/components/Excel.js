import React from 'react';

class Excel extends React.Component {
    _preSearchData = null;

    state = {
        data:this.props.initialData,
        sortby:null,
        descending:false,
        edit:null,
        search:false
    };

    

    getInitialState = ()=>{
      return {
        data:this.props.initialData,
        sortby:null,
        descending:false,
        edit:null
      };
    }

    _sort=(ev)=>{

          var cell = ev.target.cellIndex;
          var sortedData = this.state.data.slice();
          var descending = this.state.sortby === cell && !this.state.descending;
          sortedData.sort(function(a,b){
            return descending ? (a[cell] < b[cell] ? 1 : -1) : (a[cell] > b[cell] ? 1 : -1);
          });

      
          this.setState({
            data:sortedData,
            sortby:cell,
            descending:descending
          });
    }

    _showEditor = (e) =>{
      this.setState({
        edit:{
          row:parseInt(e.target.dataset.row,10),
          cell:e.target.cellIndex
        }
      })
    }

    _save = (e) =>{
      e.preventDefault();
      var input = e.target.firstChild;
      var data = this.state.data.slice();
      data[this.state.edit.row][this.state.edit.cell] = input.value;

      this.setState({
        edit:null,
        data:data
      })
    }

    _toggleSearch = ()=>{
      if(this.state.search){
        this.setState({
          data:this._preSearchData,
          search:false
        });
        this._preSearchData=null;
      }else{
        this._preSearchData=this.state.data;
        this.setState({
          search:true
        });
      }

            
    }

    _search = (ev) =>{
      var needle = ev.target.value;
      
      if(!needle){
        needle = needle.toLowerCase();
        this.setState({
          data:this._preSearchData
        });
        return;
      }
     var idx = ev.target.dataset.idx;
     var searchData = this._preSearchData.filter((row)=>{
       return row[idx].toString().toLowerCase().indexOf(needle) > -1;
     });
     this.setState({
       data:searchData
     });
    }

    _download = (format, ev)=>{
      var contents = format ==='json' ? JSON.stringify(this.state.data) 
      : this.state.data.reduce((result,row)=>{
        return result + 
                row.reduce((rowresult,cell,idx)=>{
                  return rowresult + '"' + cell.replace(/"/g, '""') + '"' + (idx <row.length -1 ? ',': '')
                });
      });

      var URL = window.URL || window.webkitURL;
      var blob = new Blob ([contents], {type:'text/'+format});
      ev.target.href = URL.createObjectURL(blob);
      ev.target.download = 'data.' + format;

    }

    _renderSearch = ()=>{
      if(this.state.search === false){
        return null;
      }
      return(
          <tr onChange = {this._search}>
            {
                this.props.headers.map((_ignore,idx)=>{
                return (
                <td key = {idx}>
                  <input type="index" data-idx={idx}></input>
                </td>
                )
              })
            }
          </tr>
        )
      
    }

    _renderTable = ()=>{
      return (
        <div className="App">
        <table>
        <thead  onClick={this._sort}>
            <tr>{this.props.headers.map((title,idx)=>{
              if(this.state.sortby === idx){
                title += this.state.descending ? ' \u2191' : ' \u2193'
              }
                return <th key={idx} >{title}</th>
            })}
            </tr>
        </thead>
          <tbody onDoubleClick={this._showEditor}>
          {
            this._renderSearch()}
            {this.state.data.map((row,rowidx)=>{
              return(
                      <tr key={rowidx}>
                        {
                          row.map((cell,idx)=>{
                            var content = cell;
                            var edit = this.state.edit;
                            if(edit && edit.row === rowidx && edit.cell ===idx){
                              content = <form onSubmit={this._save}>
                                          <input type="text" defaultValue={content}></input>
                                        </form>;
                            }
                          return  <td key={idx} data-row={rowidx}>{content}</td>
                                })
                        }
                      </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
      );
    }

    _renderToolbar = ()=>{
      return (
        <div id="topThreeButtons">
          <button className="toolbar" id = "searchButton" onClick = {this._toggleSearch}>Search</button>
          <button id = "exportButton"><a href = "data.json" onClick = {this._download.bind(this,'json')}>Export JSON</a></button>
          <button id="downloadButton"><a href = "data.csv" onClick = {this._download.bind(this,'csv')}>Download</a></button>
        </div>
      )
    }

  render() {
    return (
        <div className="Excel">
            {this._renderToolbar()}
            {this._renderTable()}
        </div>
    );


  }
}

export default Excel