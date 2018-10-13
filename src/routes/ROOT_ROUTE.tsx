import * as React from 'react';
import {
    Switch,
    Route,
    // Redirect,
} from "react-router-dom";

import LOGIN from "src/views";

function ROOT_ROUTE() {
    return (
        <Switch>
            {/*<Redirect*/}
                {/*from='/'*/}
                {/*to='/NormalLogin'*/}
                {/*exact*/}
            {/*/>*/}
            <Route
                path=""
                component={LOGIN}
            />
        </Switch>
    );
}

export default ROOT_ROUTE;
