/**
 * @class Ext.form.TextArea
 * @extends Ext.form.Field
 * @xtype textarea
 * Wraps a textarea. See {@link Ext.form.FormPanel FormPanel} for example usage.
 */
Ext.form.TextArea = Ext.extend(Ext.form.Field, {
    maskField: true,
    renderTpl: new Ext.XTemplate(
        '<div <tpl if="id">id="{id}" </tpl>class="{baseCls} {cls} {cmpCls}<tpl if="ui"> {uiBase}-{ui}</tpl> <tpl if="label">{labelAlign}</tpl>" <tpl if="style"> style="{style}"</tpl>>',
            '<tpl if="label"><label <tpl if="fieldEl">for="{inputId}"</tpl>>{label}</label></tpl>',
            '<tpl if="fieldEl"><textarea id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"',
                '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
                '<tpl if="placeholder">placeholder="{placeholder}" </tpl>',
                '<tpl if="style">style="{style}" </tpl>',
                '<tpl if="autocomplete">autocomplete="{autocomplete}" </tpl>',
            '></textarea></tpl>',
            '<div class="x-field-mask"></div>',
        '</div>',
        { compiled: true }
    ),
    ui: 'textarea'
});

Ext.reg('textarea', Ext.form.TextArea);
