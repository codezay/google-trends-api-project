import googleTrends from "google-trends-api";
import Bottleneck from "bottleneck";
//
import {
    CountryCodes,
    StateCodes,
    CountryAndStateCodes,
} from "../helpers/stored-values.js";
//
const limiter = new Bottleneck({
    maxConcurrent: 1, //calls allowed per minTime
    minTime: 10000, // ten seconds
});

async function iteratedCallOfAPI(trendTerm, givenCodes) {
    let iteratedApiCall = [];
    let responseValue = [];

    iteratedApiCall = await Promise.all(
        givenCodes.map(async (givenCode) => {
            responseValue = await limiter.schedule(async () => {
                try {
                    console.log(
                        `waiting for Ten Seconds, countryCode: ${givenCode}`
                    );
                    let iteratedApiValue = await googleTrends
                        .interestByRegion({
                            keyword: trendTerm,
                            startTime: new Date("2016-01-01"),
                            endTime: new Date("2021-01-01"),
                            geo: givenCode,
                        })
                        .then((res) => {
                            console.log(`Each iterated call: ${res} \n`);
                            return res;
                        })
                        .catch((err) => {
                            console.log(
                                `Each iterated error from call: ${err}`
                            );
                            return err;
                        });

                    console.log(`iteratedApiValue: ${iteratedApiValue} \n`);
                    return iteratedApiValue;
                    //
                } catch (e) {
                    console.log(`api error: ${e}`);
                    return e;
                }
            });
            console.log(`responseValue: ${responseValue} \n`);
            return responseValue;
        })
    );

    return iteratedApiCall;
}

export default class TrendsController {
    //

    static async initialCall(req, res, next) {
        res.json({ success: "The api route is working." });
    }

    //

    static async getTrendsOfCountries(req, res, next) {
        const trendTerm = req.params.trendTerm;
        const countryCodes = ["US", "AF", "IN", "AZ"];
        // for all the country codes to work uncomment the below and comment the above.
        // const countryCodes = CountryCodes;
        const resultOfTrendTermSearchOfCountries = await iteratedCallOfAPI(
            trendTerm,
            countryCodes
        );

        res.json(resultOfTrendTermSearchOfCountries);
    }

    //

    static async getContryTrendsThenStateTrends(req, res, next) {
        const trendTerm = req.params.trendTerm;
        const countryCodes = ["US", "AF"];
        const stateCodes = ["US-NJ", "AF-KAN"];
        // for all the country and state codes to work comment the above and uncomment the below.
        // const countryCodes = CountryCodes;
        // const stateCodes = StateCodes;
        const resultOfTrendTermSearchOfCountries = await iteratedCallOfAPI(
            trendTerm,
            countryCodes
        );
        const resultOfTrendTermSearchOfStates = await iteratedCallOfAPI(
            trendTerm,
            stateCodes
        );
        const rsultOfThisAPIcall = [
            {
                resultsFromCountries: resultOfTrendTermSearchOfCountries,
                resulsFromStates: resultOfTrendTermSearchOfStates,
            },
        ];

        res.json({ resut: rsultOfThisAPIcall });
    }

    //

    static async getCountryTrendsAndStateTrends(req, res, next) {
        const trendTerm = req.params.trendTerm;
        const countryAndStateCodes = ["US", "US-NJ", "AF", "AF-KAN"];
        // for all the country and state codes to run comment the above and uncomment the below.
        // const countryAndStateCodes = CountryAndStateCodes;
        const restultOfTrendTermSearchOfCountryAndStates =
            await iteratedCallOfAPI(trendTerm, countryAndStateCodes);
        res.json({ result: restultOfTrendTermSearchOfCountryAndStates });
    }

    //
}
