import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {


    render() {
        
         // const data = this.props.emotions;
          
                        
      return (  
          
        <div>
         
           
          <table className="table table-bordered">
            <tbody>
              <tr><th >sadness</th><th>joy</th><th>fear</th><th>disgust</th><th>anger</th></tr>  
            { 
              
               this.props.emotions.map((dynamicData) => (
                 
               
                  <tr className="trow" key={dynamicData} >
                               
                     
                      {Object.values(dynamicData).map((val) => (
                        <td colSpan="1">{val}</td>
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
