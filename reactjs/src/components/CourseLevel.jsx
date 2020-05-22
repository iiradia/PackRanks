import React from 'react'; 
import CreatableSelect from 'react-select/lib/Creatable';
import '../css/courselevel.css'; 

class CourseLevel extends React.Component{
    constructor() {
        this.state = {
            level_min: null, 
            level_max: null
        }
    }

    /*handleOnChangeMin = e => {
        const levelMin = e.target.level_min;
        this.setState({
            level_min: levelMin
        });
        this.props.onChange(levelMin)
    }
    handleOnChangeMax = e => {
        const levelMax = e.target.level_max;
        this.setState({
            level_max: levelMax,
        });
        this.props.onChange(levelMax)
    }*/
    render(){
          /* Save list of levels and options for dropdown */
        const levelListMin = ["ANY", "100", "200", "300", "400", "500", "600", "700","800"];

         const levelOptionsMin = levelListMin.map((level) => (
        {label: level, value: level}
         )); 


         const levelListMax = ["ANY", "199", "299", "399", "499", "599", "699", "799","899"];

         const levelOptionsMax = levelListMax.map((level) => (
        {label: level, value: level}
         )); 



        return(
               <div> 
                   {/* prompt for levels */ }
                    <label for="level_min" class="lead">Minimum Course Level:</label>
                    { /* Select level between 100 and 800 */ }
                    <div id="level_min_option">
                        <CreatableSelect 
                                id="level_min" 
                                options={levelOptionsMin}
                                onChange={level => this.setState({level_min: level.value})}       
                        />
                    </div>
                     {/* prompt for levels */ }
                    <label for="level_max" class="lead">Maximum Course Level</label>
                    { /* Select level between 100 and 800 */ }
                    <div id="level_max_option">
                        <CreatableSelect 
                                id="level_max" 
                                options={levelOptionsMax}
                                onChange={level => this.setState({level_max: level.value}}       
                        />
                    </div>
               </div>
        ); 
    }
}


export default CourseLevel; 
