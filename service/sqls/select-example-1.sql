SELECT
  dte AS "Active Date",
  LINE_OF_BUSINESS AS "lob",
  SUM(gov) AS "gov",
  SUM(DASHER_BASE_PAY) AS "dasher_pay",
FROM
  proddb.public.firefly_measure_financials
WHERE
  (
    dte >= '2024-10-01'
    and LINE_OF_BUSINESS in (
      'Marketplace : Subscription',
      'Marketplace : Pickup'
    )
  )
GROUP BY
  ALL