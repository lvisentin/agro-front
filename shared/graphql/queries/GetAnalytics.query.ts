import { gql } from '@apollo/client';

export const GetAnalyticsQuery = gql`
  query AnalyticsDashboard($startMonth: DateTime, $endMonth: DateTime) {
    analyticsDashboard(startMonth: $startMonth, endMonth: $endMonth) {
      plotsCount
      operationsCount
      totalSpent
      operationsGroupedByDescription {
        name
        count
      }
    }
  }
`;
