import * as React from 'react';
import {
    Switch,
    Route,
    // Redirect,
} from "react-router-dom";

import LOGIN from "src/views";
import PLATFORM from "src/views/PLATFORM";
import CHAT from "src/views/CHAT";

function ROOT_ROUTE() {
    return (
        <Switch>
            {/*<Redirect*/}
            {/*from='/'*/}
            {/*to='/NormalLogin'*/}
            {/*exact*/}
            {/*/>*/}
            <Route
                path="/"
                component={LOGIN}
                exact
            />
            <Route
                path="/platform"
                component={PLATFORM}
                exact
            />
            <Route
                path="/chat/:targetUserID"
                component={CHAT}
                exact
            />
        </Switch>
    );
}

export default ROOT_ROUTE;
