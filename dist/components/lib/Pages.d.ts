import { ReactNode } from 'react';
import { IGlobalState } from '../../state/GlobalState';
import { IResult } from '../../survey/IResult';
import { IStepData } from '../../survey/IStepData';
/**
 * Static utility methods for page components
 */
export declare abstract class Pages {
    /**
     * Internal method to compute reason for a result
     * @param props
     * @param result
     * @returns
     */
    static getReason(props: IStepData, result: IResult, global: IGlobalState): string;
    /**
     * Internal method to generate list of results
     * @param props
     * @returns
     */
    static getResults(props: IStepData, global: IGlobalState): ReactNode;
}
//# sourceMappingURL=Pages.d.ts.map