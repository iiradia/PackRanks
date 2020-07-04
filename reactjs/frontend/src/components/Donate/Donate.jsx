import React from 'react';
import {PayPalButton} from "react-paypal-button-v2";
import "./Donate.css"

class Donate extends React.Component{
    constructor(){
        super()
        this.state = {
            isDonate: false,
            donationAmount: 0.0  
        };
        this.setIsDonate=this.setIsDonate.bind(this);
        this.setDonationAmount=this.setDonationAmount.bind(this);
    }

    setIsDonate(){
        this.setState(
            prevState => {
                return {
                  isDonate : !this.state.isDonate
                };
            }
        ); 
    }

    async setDonationAmount(event){
        await this.setState({donationAmount : event.target.value})
    }


    render(){
       if(this.state.isDonate === true){
        return(
            <div>
                <div className="container-contact100">
                    <div id="donationForm" className="wrap-contact100">
                        <p id="descriptionDonate" class="lead">Thank you for donating and supporting PackRanks! <br/> - Your Friends at PackRanks</p>
                        <button onClick={this.setIsDonate}>Donate!</button>
                    </div>
                </div>
            </div>)
       }


       else{
        return(
            <div>
                <div className="container-contact100">
                <div id="donationForm" className="wrap-contact100">
                        <form
                            className="contact100-form validate-form">
                            {/*Form title */}
                            <span id="formTitle" className="contact100-form-title">
                                Donate to PackRanks!
                            </span>

                            <p id="descriptionDonate" class="lead">Please donate any amount of money to PackRanks to make our service free for the whole wolfpack! </p>


                            <label id="donationAmountLabel" class="lead" htmlFor="donationAmount">Amount: $</label>
                            <div className="wrap-input100 rs1 validate-input">
                                <input className="input100" 
                                    type="number" 
                                    name="donationAmountBox" 
                                    placeholder="0.0"
                                    required
                                    min="0.01" step="0.01"
                                    onChange={value => this.setDonationAmount(value)} />
                                <span className="focus-input100" />
                            </div>
                        </form>
                       
                        <PayPalButton
                            amount={this.state.donationAmount}
                            currency={"USD"}
                            createOrder={
                                this.setIsDonate
                            }
                        />
                    </div>
                    </div>
            </div>)
       }
    }
}


export default Donate; 