(function(){
	var app = angular.module('app.data', []);

	function Data(){
		service = this;

		var decisions = [
			{
				id: '1',
				title: 'A system is needed to track open issues during the project',
				status: 'Completed',
				decisionType: 'Governance',
				decisionForum: 'Program Managment',
				description: 'Transport operations in DK perform both full load, part load & multi drop operations (including ad hoc pick ups from customers), these operations are supported by TSS and SAP. Whereas in NO only full loads or part loads are managed, DDS supports only A to B movements.'
			},
			{
				id: '24',
				title: 'Linehaul Scheduling – Task Creation',
				description: '24 In the transport department in DK tasks can be created for the driver to pick up equipment and leave to a location thus enabling asset management, these actions are supported in TSS. In NO tasks are not used, therefor no support for tasks exists in DDS.',
				recommender: 'Recommender',
				decisionType: 'Governance',
				decisionForum: 'Program Managment',
				decisionOwner: 'Decision Owner',
				status: 'Work in progress',
				created: 'Created',
				planDecisionDate: 'Plan Decision Date',
				actualDecisionDate: 'Actual Decision Date',
				options: [
								{
									title: 'Option 1: Keep functionality in TSS and manage pick up transport operations in TSS',
									proscons: 	[
													{
														type: 'pro',
														text: 'No disruption of current process for managing distribution services '
													},
													{
														type: 'pro',
														text: 'All current capability for within POL(MAM) will be maintained'
													},
													{
														type: 'pro',
														text: 'Minimum development needs within DDS.'
													},
												]
								},
								{
									title: 'Option 2: Develop TSS capability in DDS and adopt DDS process',
									proscons: 	[
													{
														type: 'con',
														text: 'Multiple changes need to be performed DSS and in surrounding systems, interfaces (SAP etc.)'
													}
												]
								},
								{
									title: 'Option 3: Adopt DDS and NO process to current DK process ',
									proscons: 	[
													{
														type: 'con',
														text: 'Capability to manage and control transport operations will decreased leading to increase in operational costs'
													}
												]
								},

							],
				recommendation: 'Option 1',
				decision: ''
			},
			{
				id: '25',
				title: 'Linehaul Scheduling – Task Creation',
				status: 'Ready for decision',
				decisionType: 'Governance',
				decisionForum: 'Program Managment',
				description: 'In the transport department in DK tasks can be created for the driver to pick up equipment and leave to a location thus enabling asset management, these actions are supported in TSS. In NO tasks are not used, therefor no support for tasks exists in DDS.'
			},
		];

		var getAllDecisions = function(){
			return decisions;
		}

		var getDecision = function(id){
			var result = $.grep(decisions, function(e){return e.id === id});

			return result[0];
		}

		service.getAllDecisions = getAllDecisions;
		service.getDecision = getDecision;

		return service;
	};

	app.service('Data', Data)

})();