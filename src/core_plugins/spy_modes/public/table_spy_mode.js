import 'ui/agg_table';
import AggResponseTabifyTabifyProvider from 'ui/agg_response/tabify/tabify';
import tableSpyModeTemplate from 'plugins/spy_modes/table_spy_mode.html';
import spyModesRegistry from 'ui/registry/spy_modes';

function VisSpyTableProvider(Notifier, $filter, $rootScope, config, Private) {
  const tabifyAggResponse = Private(AggResponseTabifyTabifyProvider);
  const PER_PAGE_DEFAULT = 10;

  return {
    name: 'table',
    display: 'Table',
    order: 1,
    template: tableSpyModeTemplate,
    link: function tableLinkFn($scope) {
      $rootScope.$watchMulti.call($scope, [
        'vis',
        'esResp'
      ], function () {
        if (!$scope.vis || !$scope.esResp) {
          $scope.table = null;
        } else {
          if (!$scope.spy.params.spyPerPage) {
            $scope.spy.params.spyPerPage = PER_PAGE_DEFAULT;
          }

          $scope.table = tabifyAggResponse($scope.vis, $scope.esResp, {
            canSplit: false,
            asAggConfigResults: true,
            partialRows: true
          });
        }
      });
    }
  };
}

spyModesRegistry.register(VisSpyTableProvider);
