

/* Save list of levels and options for dropdown */
const levelList = ["ANY", "100", "200", "300", "400", "500", "600", "700","800"];
const levelOptions = levelList.map((level) => (
    {label: level, value: level}
));

{/* prompt for levels */ }
<label for="levelprompt" class="lead">Please select the level of the course/elective you are looking for.</label>

{ /* Select level between 100 and 800 */ }
                <div id="levelS">
                    <Select className="levelSelect" 
                            id="levelprompt" 
                            options={levelOptions}
                            onChange={dept => this.setState({level_value:dept.value})}       
                    />
                </div>