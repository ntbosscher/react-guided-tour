import React, {PropsWithChildren} from "react";
import { GuidedTourStop } from "../GuidedTourStop";

export function ProductLineTourStop(props: PropsWithChildren<any>) {

    return (
        <GuidedTourStop
            title="Choose a product line"
            description="Next is triggered programmatically when the input is changed"
            current={ProductLineTourStop}
            showDone={false}
        >
            {props.children}
        </GuidedTourStop>
    );
}