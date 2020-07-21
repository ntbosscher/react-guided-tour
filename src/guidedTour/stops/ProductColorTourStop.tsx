import React, {PropsWithChildren} from "react";
import { GuidedTourStop } from "../GuidedTourStop";
import { ProductSizeTourStop } from "./ProductSizeTourStop";

export function ProductColorTourStop(props: PropsWithChildren<any>) {

    return (
        <GuidedTourStop
            title="Choose a color"
            description="Next is wired by up by specifying the 'next' property"
            current={ProductColorTourStop}
            next={ProductSizeTourStop}
        >
            {props.children}
        </GuidedTourStop>
    );
}