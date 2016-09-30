angular.module('templates-main', ['views/credential_revisions.html', 'views/edit_credential.html', 'views/partials/forms/edit_credential/basics.html', 'views/partials/forms/edit_credential/custom_fields.html', 'views/partials/forms/edit_credential/files.html', 'views/partials/forms/edit_credential/otp.html', 'views/partials/forms/edit_credential/password.html', 'views/partials/forms/settings/export.html', 'views/partials/forms/settings/general_settings.html', 'views/partials/forms/settings/import.html', 'views/partials/forms/settings/password_settings.html', 'views/partials/forms/settings/sharing.html', 'views/partials/forms/settings/tool.html', 'views/partials/forms/share_credential/basics.html', 'views/partials/forms/share_credential/expire_settings.html', 'views/partials/password-meter.html', 'views/settings.html', 'views/share_credential.html', 'views/show_vault.html', 'views/vaults.html']);

angular.module('views/credential_revisions.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/credential_revisions.html',
    '<div id="controls"><div class="actions creatable"><div class="breadcrumb"><div class="crumb svg ui-droppable" data-dir="/"><a ng-click="logout()"><i class="fa fa-home"></i></a></div><div class="crumb svg" data-dir="/Test"><a ng-click="cancel()">{{active_vault.name}}</a></div><div class="crumb svg last" data-dir="/Test"><a ng-if="storedCredential.credential_id">Showing revisions of "{{storedCredential.label}}"</a></div></div></div></div><div off-click="closeSelected()"><table class="credential-table" ng-init="menuOpen = false;"><tr ng-repeat="revision in revisions | orderBy:\'-created\'" ng-click="selectRevision(revision)" ng-class="{\'selected\': selectedRevision.revision_id == revision.revision_id}"><td><span class="icon"><i class="fa fa-lock"></i></span> <span class="label">Revision of {{revision.created * 1000 | date:\'dd-MM-yyyy @ HH:mm:ss\'}}</span></td></tr><tr ng-show="revisions.length == 0"><td>No revisions found.</td></tr></table><div id="app-sidebar" class="detailsView scroll-container app_sidebar" ng-show="selectedRevision"><span class="close icon-close" ng-click="closeSelected()" alt="Close"></span> <b ng-show="selectedRevision">Revision of {{selectedRevision.created * 1000 | date:\'dd-MM-yyyy @ HH:mm:ss\'}}</b><table class="revision-details"><tr ng-show="selectedRevision.credential_data.label"><td>Label</td><td>{{selectedRevision.credential_data.label}}</td></tr><tr ng-show="selectedRevision.credential_data.username"><td>Account</td><td><span credential-field value="selectedRevision.credential_data.username"></span></td></tr><tr ng-show="selectedRevision.credential_data.password"><td>Password</td><td><span credential-field value="selectedRevision.credential_data.password" secret="\'true\'"></span></td></tr><tr ng-show="selectedRevision.credential_data.otp.secret"><td>OTP</td><td><span otp-generator secret="selectedRevision.credential_data.otp.secret"></span></td></tr><tr ng-show="selectedRevision.credential_data.email"><td>E-mail</td><td><span credential-field value="selectedRevision.credential_data.email"></span></td></tr><tr ng-show="selectedRevision.credential_data.url"><td>URL</td><td><span credential-field value="selectedRevision.url"></span></td></tr><tr ng-show="selectedRevision.credential_data.files.length > 0"><td>Files</td><td><div ng-repeat="file in selectedRevision.credential_data.files" class="link" ng-click="downloadFile(file)">{{file.filename}} ({{file.size | bytes}})</div></td></tr><tr ng-repeat="field in selectedRevision.credential_data.custom_fields"><td>{{field.label}}</td><td><span credential-field value="field.value" secret="field.secret"></span></td></tr><tr ng-show="selectedRevision.credential_data.changed"><td>Changed</td><td>{{selectedRevision.credential_data.changed * 1000 | date:\'dd-MM-yyyy @ HH:mm:ss\'}}</td></tr><tr ng-show="selectedRevision.credential_data.created"><td>Created</td><td>{{selectedRevision.credential_data.created * 1000 | date:\'dd-MM-yyyy @ HH:mm:ss\'}}</td></tr></table><div ng-show="selectedRevision"><button class="button" ng-click="restoreRevision(selectedRevision)"><span class="fa fa-edit"></span> Restore revision</button> <button class="button" ng-click="deleteRevision(selectedRevision)"><span class="fa fa-trash"></span> Delete revision</button></div></div></div>');
}]);

angular.module('views/edit_credential.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/edit_credential.html',
    '<div id="controls"><div class="actions creatable"><div class="breadcrumb"><div class="crumb svg ui-droppable" data-dir="/"><a ng-click="logout()"><i class="fa fa-home"></i></a></div><div class="crumb svg" data-dir="/Test"><a ng-click="cancel()">{{active_vault.name}}</a></div><div class="crumb svg last" data-dir="/Test"><a ng-if="storedCredential.credential_id">Edit credential "{{storedCredential.label}}"</a> <a ng-if="!storedCredential.credential_id">Create new credential</a></div></div></div></div><ul class="tab_header"><li ng-repeat="tab in tabs track by $index" class="tab" ng-class="{active:isActiveTab(tab)}" ng-click="onClickTab(tab)">{{tab.title}}</li></ul><div class="tab_container edit_credential"><div ng-include="currentTab.url"></div><button ng-click="saveCredential()">Save</button> <button ng-click="cancel()">Cancel</button></div>');
}]);

angular.module('views/partials/forms/edit_credential/basics.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/edit_credential/basics.html',
    '<div class="row"><div class="col-xs-12 col-md-6"><label>Label</label><div><input type="text" ng-model="storedCredential.label"></div><label>Usermame</label><div><input type="text" ng-model="storedCredential.username"></div><label>E-mail</label><div><input type="text" ng-model="storedCredential.email"></div><label>Password</label><div><password-gen ng-model="storedCredential.password" settings="pwSettings" callback="pwGenerated"></password-gen><ng-password-meter password="storedCredential.password"></ng-password-meter></div><div><label>Repeat password</label><input type="password" ng-model="storedCredential.password_repeat"></div><label>URL</label><div><input type="text" ng-model="storedCredential.url"></div></div><div class="col-xs-12 col-md-6"><label>Description</label><div><textarea class="credential_textarea" ng-model="storedCredential.description"></textarea></div><label>Add Tag</label><div class="tags_input"><tags-input ng-model="storedCredential.tags" replace-spaces-with-dashes="false"><auto-complete source="getTags($query)" min-length="0"></auto-complete></tags-input></div></div></div>');
}]);

angular.module('views/partials/forms/edit_credential/custom_fields.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/edit_credential/custom_fields.html',
    '<div class="row"><div class="col-xs-4"><label>Field label</label><input type="text" ng-model="new_custom_field.label"></div><div class="col-xs-4"><label>Field value</label><input type="text" ng-model="new_custom_field.value" ng-show="!new_custom_field.secret"> <input type="password" ng-model="new_custom_field.value" ng-show="new_custom_field.secret"><label><input type="checkbox" ng-model="new_custom_field.secret">Confidential</label></div><div class="col-xs-2"><label class="invisible">Add</label><button ng-click="addCustomField()">+</button></div></div><div class="row custom_fields" ng-if="storedCredential.custom_fields.length > 0"><div class="col-xs-12 table"><table><thead><tr use-theme><th class="field_label">Label</th><th class="field_value">Value</th><th class="field_secret">Confidential</th><th class="field_actions">Actions</th></tr></thead><tr ng-repeat="field in storedCredential.custom_fields"><td><a href="#" editable-text="field.label">{{ field.label || "empty" }}</a></td><td><span ng-if="!field.secret"><a href="#" editable-text="field.value">{{ field.value || "empty" }}</a></span> <span ng-if="field.secret"><a href="#" editable-password="field.value"><span ng-repeat="n in [] | range:field.value.length">*</span></a></span> <input ng-model="field.value" type="text" ng-show="edit && !secret"> <input ng-model="field.value" type="text" ng-show="edit && secret"></td><td><input type="checkbox" ng-model="field.secret"></td><td class="field_actions"><i class="fa fa-trash" ng-click="deleteCustomField(field)"></i></td></tr></table></div></div>');
}]);

angular.module('views/partials/forms/edit_credential/files.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/edit_credential/files.html',
    '<div class="row file_tab"><div class="col-xs-12 col-md-6"><input type="file" file-select success="fileLoaded" error="fileLoadError" progress="fileSelectProgress"> <span ng-if="fileprogress.file_percent > 0"><div progress-bar="fileprogress.file_percent"></div></span></div></div><div class="row files" ng-if="storedCredential.files.length > 0"><div class="col-xs-12 table"><table><thead use-theme><tr><th class="field_label">Filename</th><th class="field_value">Upload date</th><th class="field_secret">Size</th><th class="field_actions">Actions</th></tr></thead><tr ng-repeat="file in storedCredential.files"><td><a href="#" editable-text="file.filename">{{ file.filename || "empty" }}</a></td><td>{{file.created * 1000 | date:\'dd-MM-yyyy @ HH:mm:ss\'}}</td><td>{{file.size | bytes}}</td><td class="field_actions"><i class="fa fa-trash" ng-click="deleteFile(file)"></i></td></tr></table></div></div>');
}]);

angular.module('views/partials/forms/edit_credential/otp.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/edit_credential/otp.html',
    '<div class="row"><div class="col-xs-12"><div class="col-xs-2 nopadding">Upload your OTP qr code</div><div class="col-xs-6 nopadding"><input type="file" qrread on-read="parseQR(qrdata)" class="input_secret" on-read="parseQR(qrdata)"></div></div></div><div class="row"><div class="col-xs-12" ng-if="storedCredential.otp">Current OTP settings</div></div><div class="row"><div class="col-xs-5 col-sm-4 col-md-2" ng-if="storedCredential.otp.qr_uri"><img ng-src="{{storedCredential.otp.qr_uri.image}}"></div><div class="col-sm-4 col-sm-5 col-md-5"><table ng-show="storedCredential.otp"><tr ng-show="storedCredential.otp.type"><td>Type:</td><td>{{storedCredential.otp.type}}</td></tr><tr ng-show="storedCredential.otp.label"><td>Label:</td><td>{{storedCredential.otp.label}}</td></tr><tr ng-show="storedCredential.otp.issuer"><td>Issuer:</td><td>{{storedCredential.otp.issuer}}</td></tr><tr ng-show="storedCredential.otp.secret"><td>Secret:</td><td>{{storedCredential.otp.secret}}</td></tr><tr ng-show="storedCredential.otp.secret"><td>OTP:</td><td><span otp-generator secret="storedCredential.otp.secret"></span></td></tr></table></div></div>');
}]);

angular.module('views/partials/forms/edit_credential/password.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/edit_credential/password.html',
    '<div class="row"><div class="col-xs-12 col-md-5 col-lg-5"><label>Password</label><div><password-gen ng-model="storedCredential.password" settings="pwSettings" callback="pwGenerated"></password-gen><ng-password-meter password="storedCredential.password"></ng-password-meter></div><label>Repeat password</label><div><input type="password" ng-model="storedCredential.password_repeat"></div><label>Expire date</label><div><span datetime-picker ng-model="storedCredential.expire_time" class="link" future-only ng-show="storedCredential.expire_time == 0" close-on-select="false">No expire date set</span> <span datetime-picker ng-model="storedCredential.expire_time" class="link" future-only ng-show="storedCredential.expire_time != 0" close-on-select="false">{{ storedCredential.expire_time | date:\'dd-MM-yyyy @ HH:mm:ss\'}}</span></div><label>Renew interval</label><div><input type="number" ng-model="renewIntervalValue" min="0" ng-change="updateInterval(renewIntervalValue, renewIntervalModifier)"><select ng-model="renewIntervalModifier" ng-change="updateInterval(renewIntervalValue, renewIntervalModifier)"><option value="0">Disabled</option><option value="86400">Day(s)</option><option value="604800">Week(s)</option><option value="2592000">Month(s)</option><option value="31622400">Year(s)</option></select></div></div><div class="col-xs-12 col-md-7 col-lg-7">Password generation settings<div class="row"><div class="password_settings"><div class="col-xs-12 col-sm-5 col-lg-4"><label><span class="label">Password length</span><br><input type="number" ng-model="pwSettings.length" min="1"></label><label><span class="label">Minimum amount of digits</span><br><input type="number" ng-model="pwSettings.minimumDigitCount" min="0"></label></div><div class="col-xs-12 col-sm-6 col-lg-6"><label><input type="checkbox" ng-model="pwSettings.useUppercase"> <span class="label sm">Use uppercase letters</span></label><label><input ng-model="pwSettings.useLowercase" type="checkbox" id="lower"> <span class="label sm">Use lowercase letters</span></label><label><input ng-model="pwSettings.useDigits" type="checkbox" id="digits"> <span class="label sm">Use numbers</span></label><label><input type="checkbox" id="special" ng-model="pwSettings.useSpecialChars"> <span class="label sm">Use special characters</span></label><label><input type="checkbox" id="ambig" ng-model="pwSettings.avoidAmbiguousCharacters"> <span class="label sm">Avoid ambiguous characters</span></label><label><input type="checkbox" ng-model="pwSettings.requireEveryCharType" id="reqevery"> <span class="label sm">Require every character type</span></label></div></div></div></div></div>');
}]);

angular.module('views/partials/forms/settings/export.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/settings/export.html',
    '<div ng-controller="ExportCtrl">Export credentials</div>');
}]);

angular.module('views/partials/forms/settings/general_settings.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/settings/general_settings.html',
    '<div class="row"><div class="col-xs-12 col-md-6"><h3>Change vault key</h3><label>Old vault password</label><input type="password" ng-model="oldVaultPass"><label>New vault password</label><password-gen ng-model="newVaultPass"></password-gen><ng-password-meter password="newVaultPass"></ng-password-meter><label>New vault password</label><input type="password" ng-model="newVaultPass2"> <button ng-click="changeVaultPassword(oldVaultPass,newVaultPass,newVaultPass2)" tooltip="\'Not working :P\'">Change</button></div><div class="col-xs-12 col-md-6"><h3>About passman</h3><p>Version: <b>{{passman_version}}</b><br>Bla bla about passman, changelog.<br><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6YS8F97PETVU2" target="_blank" class="link">Donate to support development</a></p></div></div>');
}]);

angular.module('views/partials/forms/settings/import.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/settings/import.html',
    '<div ng-controller="ImportCtrl"><div class="row"><div class="col-xs-6"><label>Import type<select ng-init="importerType" ng-model="importerType" ng-change="setImporter(importerType)"><option ng-repeat="importer in available_importers" value="{{importer}}">{{importer.name}}</option></select></label><div><b>{{selectedImporter.description}}</b></div><input ng-if="selectedImporter" type="file" file-select success="fileLoaded" error="fileLoadError" progress="fileSelectProgress"><br><button class="button" ng-click="startImport()" ng-if="selectedImporter">Import</button><div ng-if="file_read_progress.percent > 0">Read progress<div progress-bar="file_read_progress.percent"></div>{{ file_read_progress.loaded }} / {{ file_read_progress.total }}</div><div ng-if="import_progress.progress > 0">Upload progress<div progress-bar="import_progress.progress"></div>{{ import_progress.loaded }} / {{ import_progress.total }}</div></div><div class="col-xs-6"><div ng-if="log" class="import_log"><textarea id="import_log" auto-scroll="log">{{log.join(\'\\n\')}}</textarea></div></div></div></div>');
}]);

angular.module('views/partials/forms/settings/password_settings.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/settings/password_settings.html',
    '<div class="password_settings"><div class="col-xs-12 col-sm-5 col-lg-4"><label><span class="label">Password length</span><br><input type="number" ng-model="vault_settings.pwSettings.length" min="1"></label><label><span class="label">Minimum amount of digits</span><br><input type="number" ng-model="vault_settings.pwSettings.minimumDigitCount" min="0"></label><label><span class="label">Generate password on creation</span><br><input type="checkbox" ng-model="vault_settings.pwSettings.generateOnCreate" min="0"></label></div><div class="col-xs-12 col-sm-6 col-lg-6"><label><input type="checkbox" ng-model="vault_settings.pwSettings.useUppercase"> <span class="label sm">Use uppercase letters</span></label><label><input ng-model="vault_settings.pwSettings.useLowercase" type="checkbox" id="lower"> <span class="label sm">Use lowercase letters</span></label><label><input ng-model="vault_settings.pwSettings.useDigits" type="checkbox" id="digits"> <span class="label sm">Use numbers</span></label><label><input type="checkbox" id="special" ng-model="vault_settings.pwSettings.useSpecialChars"> <span class="label sm">Use special characters</span></label><label><input type="checkbox" id="ambig" ng-model="vault_settings.pwSettings.avoidAmbiguousCharacters"> <span class="label sm">Avoid ambiguous characters</span></label><label><input type="checkbox" ng-model="vault_settings.pwSettings.requireEveryCharType" id="reqevery"> <span class="label sm">Require every character type</span></label></div></div><div class="row"><div class="col-xs-12"><button class="button" ng-click="saveVaultSettings()">Save</button></div></div>');
}]);

angular.module('views/partials/forms/settings/sharing.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/settings/sharing.html',
    '<div ng-controller="SharingSettingsCtrl"><div class="row"><div class="col-md-6"><label>Private Key</label><textarea class="col-md-12">{{sharing_keys.private_sharing_key}}</textarea></div><div class="col-md-6"><label>Public key</label><textarea class="col-md-12">{{sharing_keys.public_sharing_key}}</textarea></div></div><div class="row"><div class="col-md-12"><label>Key size<select ng-model="key_size"><option value="512">512</option><option value="1024">1024</option><option value="2048">2048</option><option value="4096">4096</option></select><button ng-if="!generating" ng-click="generateKeys(key_size)">Generate sharing keys</button> <button ng-if="generating"><i class="fa fa-spinner fa-spin"></i> Generating sharing keys step {{progress}}/2</button></label></div></div></div>');
}]);

angular.module('views/partials/forms/settings/tool.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/settings/tool.html',
    '<div class="row"><div class="col-xs-12"><p>The password tool will scan your password, calculate the avarage crack time and, if below the threshold, show them</p></div><div class="col-xs-12" ng-init="minStrength = 3;">Minimum password stength <input type="number" min="1" max="4" value="3" ng-model="minStrength"> <button ng-click="startScan(minStrength)">Start scan</button></div></div><div class="row" ng-show="scan_result"><div class="col-xs-12"><p>Passman scanned your passwords, and here is the result.<br>A total of <b>{{scan_result.length}}</b> weak credentials.<br></p><table class="table scan-result-table"><thead><tr><td>Label</td><td>Score</td><td>Password</td><td>Action</td></tr></thead><tbody><tr ng-repeat="result in scan_result | orderBy:\'password_zxcvbn_result.score\'"><td>{{result.label}}</td><td class="score"><ng-password-meter password="result.password"></ng-password-meter></td><td><span credential-field value="result.password" secret="\'true\'"></span></td><td><a class="link" ng-href="#/vault/{{active_vault.vault_id}}/edit/{{result.credential_id}}" tooltip="\'Edit credential\'"><i class="fa fa-edit"></i></a></td></tr></tbody></table></div></div>');
}]);

angular.module('views/partials/forms/share_credential/basics.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/share_credential/basics.html',
    '<div class="row"><div class="col-xs-12 col-md-6"><div><table class="table sharing_table"><thead><tr><td><tags-input ng-model="inputSharedWith" replace-spaces-with-dashes="false" add-from-autocomplete-only="true" placeholder="Search users or groups..."><auto-complete source="searchUsers($query)" min-length="0" template="autocomplete-template"></auto-complete></tags-input></td><td><select ng-model="selectedAccessLevel"><option ng-repeat="lvl in accessLevels" value="{{lvl.value}}">{{lvl.label}}</option></select><button class="button" ng-click="shareWith(inputSharedWith, selectedAccessLevel)">+</button></td></tr></thead></table></div></div></div><div class="row"><div class="col-xs-12 col-md-6"><table class="table shared_table" ng-show="share_settings.credentialSharedWithUserAndGroup.length > 0"><thead><tr><td>User / group</td><td>Access</td></tr></thead><tr ng-repeat="user in share_settings.credentialSharedWithUserAndGroup"><td><i class="fa fa-user" ng-if="user.type === \'user\'"></i> <i class="fa fa-group" ng-if="user.type === \'group\'"></i> {{user.userId}}</td><td>{{user.accessLevel}}</td></tr></table></div></div><script type="text/ng-template" id="autocomplete-template"><i class="fa fa-user" ng-if="data.type === \'user\'"></i>\n' +
    '	<i class="fa fa-group" ng-if="data.type === \'group\'"></i>\n' +
    '	{{data.text}}</script>');
}]);

angular.module('views/partials/forms/share_credential/expire_settings.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/forms/share_credential/expire_settings.html',
    'Expire settings');
}]);

angular.module('views/partials/password-meter.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/partials/password-meter.html',
    '<div class="pass-meter {{masterClass}}" off-click="matchBreakdown = false;"><div class="{{colClass}} pass-meter-col {{first}}"><div class="indicator"></div></div><div class="{{colClass}} pass-meter-col {{second}}"><div class="indicator"></div></div><div class="{{colClass}} pass-meter-col {{third}}"><div class="indicator"></div></div><div class="{{colClass}} pass-meter-col {{fourth}}"><div class="indicator"></div></div><div class="details" ng-click="toggleScore()"><span ng-show="!scoreShown">Details</span> <span ng-show="scoreShown">Hide details</span></div><div class="pass-meter-message">{{message}}</div><div class="detail_box" ng-show="scoreShown"><div class="row"><div class="col-xs-6">Password score:</div><div class="col-xs-6">{{score.score}}</div></div><div><b>Cracking times</b></div><div class="row"><div class="col-xs-6">100 / hour<br><small>Throttled online attack</small></div><div class="col-xs-6">{{score.crack_times_display.online_throttling_100_per_hour}}</div></div><div class="row"><div class="col-xs-6">10 / second<br><small>Unthrottled online attack</small></div><div class="col-xs-6">{{score.crack_times_display.online_no_throttling_10_per_second}}</div></div><div class="row"><div class="col-xs-6">10k / second<br><small>Offline attack, slow hash, many cores</small></div><div class="col-xs-6">{{score.crack_times_display.offline_slow_hashing_1e4_per_second}}</div></div><div class="row"><div class="col-xs-6">10B / second<br><small>offline attack, fast hash, many cores</small></div><div class="col-xs-6">{{score.crack_times_display.offline_fast_hashing_1e10_per_second}}</div></div><div class="row"><div class="col-xs-6">Match sequence:</div><div class="col-xs-6"><span class="link" ng-click="toggleMatchBreakdown()">See match sequence</span></div></div></div></div><div class="match-sequence"><div class="sequence_container" ng-style="{\'width\': score.sequence.length * 210 }"><div class="sequence" ng-repeat="sequence in score.sequence"><table><tr><td colspan="2" class="token"><code>{{sequence.token}}</code></td></tr><tr ng-if="sequence.pattern"><td>Pattern</td><td>{{sequence.pattern}}</td></tr><tr ng-if="sequence.matched_word"><td>Matched word</td><td>{{sequence.matched_word}}</td></tr><tr ng-if="sequence.dictionary_name"><td>Dictionary name</td><td>{{sequence.dictionary_name}}</td></tr><tr ng-if="sequence.rank"><td>Rank</td><td>{{sequence.rank}}</td></tr><tr ng-if="sequence.reversed"><td>Reversed</td><td>{{sequence.reversed}}</td></tr><tr ng-if="sequence.guesses"><td>Guesses</td><td>{{sequence.guesses}}</td></tr><tr ng-if="sequence.base_guesses"><td>Base guesses</td><td>{{sequence.base_guesses}}</td></tr><tr ng-if="sequence.uppercase_variations"><td>Uppercase variations</td><td>{{sequence.uppercase_variations}}</td></tr><tr ng-if="sequence.l33t_variations"><td>l33t-variations</td><td>{{sequence.l33t_variations}}</td></tr></table></div></div></div>');
}]);

angular.module('views/settings.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/settings.html',
    '<div id="controls"><div class="actions creatable"><div class="breadcrumb"><div class="crumb svg ui-droppable"><a ng-click="logout()"><i class="fa fa-home"></i></a></div><div class="crumb svg"><a ng-click="cancel()">{{active_vault.name}}</a></div><div class="crumb svg last"><a>Settings</a></div></div></div></div><ul class="tab_header"><li ng-repeat="tab in tabs track by $index" class="tab" ng-class="{active:isActiveTab(tab)}" ng-click="onClickTab(tab)">{{tab.title}}</li></ul><div class="tab_container edit_credential"><div ng-include="currentTab.url"></div></div>');
}]);

angular.module('views/share_credential.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/share_credential.html',
    '<div id="controls"><div class="actions creatable"><div class="breadcrumb"><div class="crumb svg ui-droppable" data-dir="/"><a ng-click="logout()"><i class="fa fa-home"></i></a></div><div class="crumb svg" data-dir="/Test"><a ng-click="cancel()">{{active_vault.name}}</a></div><div class="crumb svg last" data-dir="/Test"><a ng-if="storedCredential.credential_id">Share credential "{{storedCredential.label}}"</a></div></div></div></div><ul class="tab_header"><li ng-repeat="tab in tabs track by $index" class="tab" ng-class="{active:isActiveTab(tab)}" ng-click="onClickTab(tab)">{{tab.title}}</li></ul><div class="tab_container edit_credential"><div ng-include="currentTab.url"></div><button ng-click="applyShare()">Share</button> <button ng-click="cancel()">Cancel</button></div>');
}]);

angular.module('views/show_vault.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/show_vault.html',
    '<div id="passman-controls"><div class="breadcrumb"><div class="breadcrumb"><div class="crumb svg ui-droppable" data-dir="/"><a><i class="fa fa-home"></i></a></div><div class="crumb svg last"><a>{{active_vault.name}}</a></div></div></div><span class="title" ng-if="delete_time">Showing deleted since: <span ng-if="delete_time == 1">All time</span> <span ng-if="delete_time > 1">{{delete_time | date:\'dd-MM-yyyy @ HH:mm:ss\'}}</span></span> <span class="title" ng-show="active_vault.credentials && !delete_time">Showing {{filtered_credentials.length}} of {{active_vault.credentials.length}} credentials</span><div class="actions creatable"><span ng-click="menuOpen = !menuOpen" class="button new" ng-init="menuOpen = false" off-click="menuOpen = false;"><span>+</span></span><div class="actionList popovermenu bubble menu" ng-show="menuOpen"><ul><li><span ng-click="addCredential()" class="menuitem action"><span class="icon icon-rename"></span> <span>New credential</span></span></li><li><span href="#" class="menuitem action"><span class="icon icon-shared"></span> <span>New shared credential</span></span></li></ul></div></div><div class="searchboxContainer"><input type="text" ng-model="filterOptions.filterText" class="searchbox" placeholder="Search credential..." select-on-click></div><div class="viewModes"><div class="view-mode" ng-class="{\'active\': view_mode === \'list\' }" ng-click="switchViewMode(\'list\')"><i class="fa fa-list"></i></div><div class="view-mode" ng-class="{\'active\': view_mode === \'grid\' }" ng-click="switchViewMode(\'grid\')"><i class="fa fa-th-large"></i></div></div></div><div off-click="closeSelected()"><div class="loaderContainer" ng-if="show_spinner"><div class="loader" use-theme type="\'border-bottom-color\'"></div></div><div ng-init="menuOpen = false;"><table class="credential-table" ng-if="view_mode === \'list\'"><tr ng-repeat="credential in active_vault.credentials | credentialSearch:filterOptions | tagFilter:selectedtags | orderBy:\'label\'| as:this:\'filtered_credentials\'" ng-if="credential.hidden == 0 && showCredentialRow(credential)" ng-click="selectCredential(credential)" ng-class="{\'selected\': selectedCredential.credential_id == credential.credential_id}"><td><span class="icon"><i class="fa fa-lock"></i></span> <span class="label">{{credential.label}}</span> <span class="tags"><span class="tag" ng-repeat="tag in credential.tags_raw">{{tag.text}}</span></span></td></tr></table><ul class="grid-view" ng-if="view_mode === \'grid\'"><li class="credential" ng-repeat="credential in active_vault.credentials | credentialSearch:filterOptions | tagFilter:selectedtags | orderBy:\'label\'| as:this:\'filtered_credentials\'" ng-if="credential.hidden == 0 && showCredentialRow(credential)" ng-click="selectCredential(credential)" use-theme type="\'border-color\'"><div class="credential_content"><div class="label">{{credential.label}}</div><div class="tags"><div class="tag" ng-repeat="tag in credential.tags_raw">{{tag.text}}</div></div></div></li></ul></div><div id="app-sidebar" class="detailsView scroll-container app_sidebar" ng-show="selectedCredential"><span class="close icon-close" ng-click="closeSelected()" alt="Close"></span><table><tr ng-show="selectedCredential.label"><td>Label</td><td>{{selectedCredential.label}}</td></tr><tr ng-show="selectedCredential.username"><td>Account</td><td><span credential-field value="selectedCredential.username"></span></td></tr><tr ng-show="selectedCredential.password"><td>Password</td><td><span credential-field value="selectedCredential.password" secret="\'true\'"></span></td></tr><tr ng-show="selectedCredential.otp.secret"><td>OTP</td><td><span otp-generator secret="selectedCredential.otp.secret"></span></td></tr><tr ng-show="selectedCredential.email"><td>E-mail</td><td><span credential-field value="selectedCredential.email"></span></td></tr><tr ng-show="selectedCredential.url"><td>URL</td><td><span credential-field value="selectedCredential.url"></span></td></tr><tr ng-show="selectedCredential.files.length > 0"><td>Files</td><td><div ng-repeat="file in selectedCredential.files" class="link" ng-click="downloadFile(file)">{{file.filename}} ({{file.size | bytes}})</div></td></tr><tr ng-repeat="field in selectedCredential.custom_fields"><td>{{field.label}}</td><td><span credential-field value="field.value" secret="field.secret"></span></td></tr><tr ng-show="selectedCredential.expire_time > 0"><td>Expire time</td><td>{{selectedCredential.expire_time * 1000 | date:\'dd-MM-yyyy @ HH:mm:ss\'}}</td></tr><tr ng-show="selectedCredential.changed"><td>Changed</td><td>{{selectedCredential.changed * 1000 | date:\'dd-MM-yyyy @ HH:mm:ss\'}}</td></tr><tr ng-show="selectedCredential.created"><td>Created</td><td>{{selectedCredential.created * 1000 | date:\'dd-MM-yyyy @ HH:mm:ss\'}}</td></tr></table><div class="tags"><span class="tag" ng-repeat="tag in selectedCredential.tags">{{tag.text}}</span></div><div ng-show="selectedCredential"><button class="button" ng-click="editCredential(selectedCredential)" ng-if="selectedCredential.delete_time == 0"><span class="fa fa-edit"></span> Edit</button> <button class="button" ng-click="deleteCredential(selectedCredential)" ng-if="selectedCredential.delete_time == 0"><span class="fa fa-trash"></span> Delete</button> <button class="button" ng-click="shareCredential(selectedCredential)" ng-if="selectedCredential.delete_time == 0"><span class="fa fa-share"></span> Share</button> <button class="button" ng-click="getRevisions(selectedCredential)" ng-if="selectedCredential.delete_time == 0"><span class="fa fa-undo"></span> Revisions</button> <button class="button" ng-if="selectedCredential.delete_time > 0" ng-click="recoverCredential(selectedCredential)"><span class="fa fa-recycle"></span> Recover</button> <button class="button" ng-if="selectedCredential.delete_time > 0" ng-click="destroyCredential(selectedCredential)"><span class="fa fa-bomb"></span> Destroy</button></div></div></div>');
}]);

angular.module('views/vaults.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('views/vaults.html',
    '<div class="vault_wrapper"><div class="vaults" ng-if="!list_selected_vault && !creating_vault"><div class="ui-select-container ui-select-bootstrap vaultlist"><ul><li ng-click="newVault()">+ Create a new vault</li><li ng-repeat="vault in vaults" ng-class="{\'selected\': vault == list_selected_vault }" ng-click="selectVault(vault)"><div><span class="ui-select-choices-row-inner"><div class="ng-binding ng-scope">{{vault.name}}</div><small class="ng-binding ng-scope">Created: {{vault.created * 1000 | date:\'dd-MM-yyyy @ HH:mm:ss\'}} | Last accessed: <span ng-if="vault.last_access > 0">{{vault.last_access * 1000 | date:\'dd-MM-yyyy @ HH:mm:ss\'}}</span> <span ng-if="vault.last_access === 0">Never</span></small></span></div></li><li ng-if="vaults.length === 0">No vaults found, why not create one?</li></ul></div></div><div ng-if="creating_vault"><div class="login_form" ng-init="vault_name = \'\' ">Please give your new vault a name.<div><input type="text" ng-model="vault_name" required></div><div>Vault password <input type="password" ng-model="vault_key" required><ng-password-meter password="vault_key"></ng-password-meter></div><div>Repeat vault password <input type="password" ng-model="vault_key2" required></div><div ng-show="error" class="error"><ul><li>{{error}}</li></ul></div><div class="button_wrapper"><div class="button button-geen" ng-if="!creating_keys" ng-click="createVault(vault_name, vault_key, vault_key2)"><span>Create vault</span></div><div class="button" ng-if="creating_keys"><span><i class="fa fa-spinner fa-spin"></i> {{creating_keys}}</span></div><div class="button button-red" ng-click="clearState()">Cancel</div><div class="hidden">{{sharing_keys}}</div></div></div></div><div ng-if="list_selected_vault != false"><div class="vaultlist"><ul><li ng-click="clearState()">Go back to vaults</li></ul></div><div class="login_form"><div ng-show="error" class="error"><ul><li>{{error}}</li></ul></div>Please input the password for {{list_selected_vault.name}}<div class="pw-input"><input type="password" ng-model="vault_key"> <small class="last_access">Last accessed: <span ng-if="list_selected_vault.last_access > 0">{{list_selected_vault.last_access * 1000 | date:\'dd-MM-yyyy @ HH:mm:ss\'}}</span> <span ng-if="list_selected_vault.last_access === 0">Never</span></small></div><div><div><label><input type="checkbox" ng-checked="default_vault" ng-click="toggleDefaultVault()"> Set this vault as default.</label></div><div><label><input type="checkbox" ng-checked="remember_vault_password" ng-click="toggleRememberPassword()"> Login automatically to this vault.</label></div></div><div class="button button-geen" ng-click="loginToVault(list_selected_vault, vault_key)">Decrypt vault</div></div></div></div>');
}]);
