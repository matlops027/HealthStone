import { OpenHSDB } from '../connect';


export const GetStatisticsDB = async (IDPROF) => {
    return new Promise(async (resolve, reject) => {
        let stats = [];
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `
                        SELECT * 
                            FROM 
                                (SELECT 
                                    COUNT(H.IDHIST) AS SUCCESS 
                                    FROM HIST H
                                        JOIN QUES Q ON Q.IDQUES = H.IDQUES
                                    WHERE H.HISTSTAT = 1
                                        AND Q.IDPROF = ${IDPROF})
                            CROSS JOIN 
                                (SELECT 
                                    COUNT(H.IDHIST) AS FAIL
                                    FROM HIST H
                                        JOIN QUES Q ON Q.IDQUES = H.IDQUES
                                    WHERE H.HISTSTAT <> 1
                                        AND Q.IDPROF = ${IDPROF})

                        UNION ALL

                        SELECT * 
                            FROM 
                                (SELECT
                                    COALESCE(SUM((F.ENRGKCAL / F.BASEQTTY) * QF.FOODQTY), 0) SUCCESS
                                FROM FOOD F
                                    JOIN QUES_FOOD QF ON QF.IDFOOD = F.IDFOOD
                                    JOIN QUES Q ON Q.IDQUES = QF.IDQUES
                                    JOIN HIST H ON H.IDQUES = Q.IDQUES
                                WHERE H.HISTSTAT = 1
                                    AND Q.IDPROF = ${IDPROF} )
                            CROSS JOIN 
                                (SELECT
                                    COALESCE(SUM((F.ENRGKCAL / F.BASEQTTY) * QF.FOODQTY), 0) FAIL
                                FROM FOOD F
                                    JOIN QUES_FOOD QF ON QF.IDFOOD = F.IDFOOD
                                    JOIN QUES Q ON Q.IDQUES = QF.IDQUES
                                    JOIN HIST H ON H.IDQUES = Q.IDQUES
                                WHERE H.HISTSTAT <> 1
                                    AND Q.IDPROF = ${IDPROF} )

                        UNION ALL

                        SELECT * 
                            FROM 
                                (SELECT 
                                    COALESCE(GROUP_CONCAT(CATEGOID), 0) SUCCESS 
                                FROM
                                    (SELECT 
                                        F.CATEGOID,
                                        COUNT(F.CATEGOID)
                                    FROM FOOD F
                                        JOIN QUES_FOOD QF ON QF.IDFOOD = F.IDFOOD
                                        JOIN QUES Q ON Q.IDQUES = QF.IDQUES
                                        JOIN HIST H ON H.IDQUES = Q.IDQUES
                                    WHERE H.HISTSTAT = 1
                                        AND Q.IDPROF = ${IDPROF}
                                    GROUP BY F.CATEGOID
                                    ORDER BY COUNT(F.CATEGOID) DESC
                                    LIMIT 3))			
                            CROSS JOIN 
                                (SELECT 
                                    COALESCE(GROUP_CONCAT(CATEGOID), 0) FAIL 
                                FROM
                                    (SELECT 
                                        F.CATEGOID,
                                        COUNT(F.CATEGOID)
                                    FROM FOOD F
                                        JOIN QUES_FOOD QF ON QF.IDFOOD = F.IDFOOD
                                        JOIN QUES Q ON Q.IDQUES = QF.IDQUES
                                        JOIN HIST H ON H.IDQUES = Q.IDQUES
                                    WHERE H.HISTSTAT <> 1
                                        AND Q.IDPROF = ${IDPROF}
                                    GROUP BY F.CATEGOID
                                    ORDER BY COUNT(F.CATEGOID) DESC
                                    LIMIT 3))
                            `,
                         [],
                    ).then(([hsTransaction, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            stats.push(row);
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, stats });
            }).catch((err) => {
                reject(err);
            })
        });

    });
}




