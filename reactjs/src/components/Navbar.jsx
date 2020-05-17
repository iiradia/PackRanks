import React from 'react';
import NavbarTitle from './NavbarTitle';
import NavbarLinks from './NavbarLinks';

class Navbar extends React.Component {
    render() {
        return(
            <div>
                <NavbarTitle /> {/* create and import */}
                <NavbarLinks /> {/* may need to pass props */}
            </div>
        );
    }
}

export default Navbar; /** Default export since this file only contains a single
                        component. All code in this file is necessary for the
                        parent to function. Named export would not be of benefit in this case.*/