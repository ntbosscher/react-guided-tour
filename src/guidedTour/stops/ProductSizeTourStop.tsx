import React, {PropsWithChildren} from "react";
import { GuidedTourStop } from "../GuidedTourStop";

export function ProductSizeTourStop(props: PropsWithChildren<any>) {

    return (
        <GuidedTourStop
            title="Choose a color"
            description="This is the end of the road"
            current={ProductSizeTourStop}
            showDone={true}
        >
            {props.children}
        </GuidedTourStop>
    );
}