import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {


    render() {
        
          const data = this.props.emotions;
          
                        
      return (  
          
        <div>
         
           
          <table className="table table-bordered">
            <tbody>
              
            { 
               
               this.props.emotions.map((item) => (
                  <tr key={item} >
                    {Object.keys(item).map((key) => (
                             <td colSpan="1">{key}</td>
                      ))}
                      {Object.values(item).map((val) => (
                        <td colSpan="2">{val}</td>
                      ))}

                      
                     
                 </tr>
               
             ))
                
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
