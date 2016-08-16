import _ from 'lodash';
import {PanelCtrl} from 'app/plugins/sdk';
import {impressions} from 'app/features/dashboard/impression_store';
import config from 'app/core/config';
import './css/bootstrap.css!';

export class TestCtrl extends PanelCtrl {
    constructor($scope, $injector, backendSrv) {
        super($scope, $injector);
        this.backendSrv = backendSrv;
        this.test = [];
        if (!sessionStorage.getItem('dashlist')) {
            sessionStorage.setItem('dashlist', '[]');
        } else {
            this.test = JSON.parse(sessionStorage.getItem('dashlist'));
        }
        this.updateText();
    }

    updateText() {
        var dashIds = impressions.getDashboardOpened();
        this.backendSrv.search({dashboardIds: dashIds, limit: this.panel.limit}).then(result => {
            var uri = "db/" + window.location.pathname.split("/").pop();
            var obj = _.find(result, { uri: uri });
            this.test.push( { url: "dashboard/" + uri + "?hide_top_bar", name: obj.title } );
            sessionStorage.setItem('dashlist', JSON.stringify(this.test));
        });
    }

    link(scope, elem) {
        this.events.on('render', () => {
            const $panelContainer = elem.find('.panel-content');
            $panelContainer.css('padding', '0');
        });
    }

}

TestCtrl.templateUrl = 'module.html';
