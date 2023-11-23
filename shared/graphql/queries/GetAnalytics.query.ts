import { gql } from '@apollo/client';

export const GetAnalyticsQuery = gql`
  query AnalyticsDashboard($startMonth: DateTime, $endMonth: DateTime, $propertyId: Float) {
    analyticsDashboard(startMonth: $startMonth, endMonth: $endMonth, propertyId: $propertyId) {
      plotsCount
      operationsCount
      operationsGroupedByDescription {
        name
        count
      }
      totalSpent
      costPerPlot {
        plot {
          name
          id
          farmingType
          size
          propertyId
        }
        totalCost
      }
      costPerHectare
      productUsageByCategory {
        category {
          id
          name
        }
        usage
      }
      roi
    }
  }
`;
